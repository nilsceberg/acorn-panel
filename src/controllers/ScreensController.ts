import ApolloClient, { gql } from "apollo-boost";
import { Model } from "../model/Model";
import { Pages } from "../model/Pages";
import { autorun, observe, Lambda } from "mobx";
import { sleep } from "../util/async";

export class ScreensController {
	private client: ApolloClient<any>;
	private model: Model;

	private observeDisposer: Lambda;

	constructor(model: Model) {
		this.model = model;
		this.client = new ApolloClient({
			uri: "http://localhost:8080/api"
		});

		this.observeDisposer = observe(model, "page", async (change) => {
			if (change.newValue.identifier === Pages.Screens.identifier && change.newValue.identifier !== change.oldValue.identifier) {
				model.screensLoading = true;
				const screens = await this.getScreens();
				console.log(screens);
				model.screens = screens;
				model.screensLoading = false;
			}
		});
	}

	public dispose() {
		this.observeDisposer();
		console.log("Disposed.");
	}

	private async getScreens(): Promise<any> {
		const response = await this.client.query({
			query: gql`
				query screens {
					screens {
						name
						uuid
						connected
						identify
					}
				}
				`,
			fetchPolicy: "no-cache",
		});

		return response.data.screens;
	}

	public async setIdentify(uuid: string, identify: boolean): Promise<any> {
		const response = await this.client.mutate({
			mutation: gql`
				mutation identify($uuid: String!, $identify: Boolean!) {
					identify(uuid: $uuid, identify: $identify)
				}
				`,
			fetchPolicy: "no-cache",
			variables: {
				uuid, identify
			}
		});

		return response.data.identify;
	}
}