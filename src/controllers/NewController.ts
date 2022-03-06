import ApolloClient, { gql } from "apollo-boost";
import { Model } from "../model/Model";
import { Pages } from "../model/Pages";
import { autorun, observe, Lambda } from "mobx";
import { sleep } from "../util/async";

export class NewController {
	private client: ApolloClient<any>;
	private model: Model;
	private refreshing: boolean = false;

	private observeDisposer: Lambda;
	private refreshTimeout: any = true;

	constructor(model: Model) {
		this.model = model;
		this.client = new ApolloClient({
			uri: AcornConfig.api
		});

		// See dispose method for caveats.
		const refreshPending = async () => {
			this.refreshTimeout = true;
			this.refresh(false);

			if (this.refreshTimeout) {
				this.refreshTimeout = setTimeout(refreshPending, 2000);
			}
		}

		refreshPending();

		this.observeDisposer = observe(model, "page", async (change) => {
			if (change.newValue.identifier === Pages.New.identifier && change.newValue.identifier !== change.oldValue.identifier) {
				await this.refresh();
			}
		});
	}

	public async refresh(showLoading: boolean = true) {
		this.model.newLoading = this.model.newLoading || showLoading;

		if (this.refreshing) {
			return;
		}

		const pending = await this.getPending();

		this.model.pendingRegistrations = pending;
		this.model.newLoading = false;
		this.refreshing = false;
	}

	public dispose() {
		this.observeDisposer();

		// This is really bad, but cancelling the recurring refresh isn't
		// trivial. The timeout callback sets the timeout handle to true when it
		// starts, and thus if it's true we only need to set it to something falsy
		// and it won't be started again. If it's not true, then we need to cancel
		// the pending timeout itself.
		if (this.refreshTimeout === true) {
			this.refreshTimeout = null;
		}
		else {
			clearTimeout(this.refreshTimeout);
		}

		console.log("Disposed.");
	}

	private async getPending(): Promise<any> {
		const response = await this.client.query({
			query: gql`
			query pendingRegistrations {
				pendingRegistrations {
					hostname
					ip
					uuid
				}
			}
			`,
			fetchPolicy: "no-cache"
		});

		return response.data.pendingRegistrations;
	}

	public async acceptNew(screen: string, name: string): Promise<any> {
		const response = await this.client.mutate({
			mutation: gql`
				mutation acceptNew($screen: ID!, $name: String!) {
					acceptNew(screen: $screen, name: $name) {
						name
					}
				}
			`,
			fetchPolicy: "no-cache",
			variables: {
				screen,
				name,
			}
		});

		return response.data.acceptNew;
	}
}