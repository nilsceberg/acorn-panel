import ApolloClient, { gql } from "apollo-boost";
import { Model } from "../model/Model";
import { Pages } from "../model/Pages";
import { autorun, observe, Lambda } from "mobx";
import { sleep } from "../util/async";

export class NewController {
	private client: ApolloClient<any>;
	private model: Model;

	private observeDisposer: Lambda;
	private refreshTimeout: any = true;

	constructor(model: Model) {
		this.model = model;
		this.client = new ApolloClient({
			uri: "http://localhost:8080/api"
		});

		// See dispose method for caveats.
		const refreshPending = async () => {
			this.refreshTimeout = true;
			if (this.model.page.identifier !== Pages.New.identifier) {
				const pending = await this.getPending();
				if (this.model.page.identifier !== Pages.New.identifier) {
					this.model.pendingRegistrations = pending;
				}
			}

			if (this.refreshTimeout) {
				this.refreshTimeout = setTimeout(refreshPending, 2000);
			}
		}

		refreshPending();

		this.observeDisposer = observe(model, "page", async (change) => {
			if (change.newValue.identifier === Pages.New.identifier && change.newValue.identifier !== change.oldValue.identifier) {
				model.newLoading = true;
				await sleep(1000);
				const pending = await this.getPending();
				model.pendingRegistrations = pending;
				model.newLoading = false;
			}
		});
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
			`
		});

		return response.data.pendingRegistrations;
	}
}