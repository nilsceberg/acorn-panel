import ApolloClient, { gql } from "apollo-boost";
import { Model } from "../model/Model";
import { Pages } from "../model/Pages";
import { autorun, observe, Lambda, computed } from "mobx";
import { sleep } from "../util/async";

const fragments = gql`
fragment Schedule on Schedule {
	uuid
	name
	playlist {
		name
		uuid
	}
}
`;

export class SchedulesController {
	private client: ApolloClient<any>;
	private model: Model;

	private observeDisposer: Lambda;

	constructor(model: Model) {
		this.model = model;
		this.client = new ApolloClient({
			uri: AcornConfig.api
		});

		this.observeDisposer = observe(model, "page", async (change) => {
			if (change.newValue.identifier === Pages.Schedules.identifier && change.newValue.identifier !== change.oldValue.identifier) {
				model.schedulesLoading = true;
				const schedules = await this.getSchedules();
				console.log(schedules);
				model.schedules = schedules;
				model.schedulesLoading = false;
			}
		});
	}

	//@computed
	public playlistNames(): { [uuid: string]: string } {
		const mapping: { [uuid: string]: string } = {};
		this.model.playlists.forEach(playlist => mapping[playlist.uuid] = playlist.name);
		console.log("mapping", mapping);
		return mapping;
	}

	public dispose() {
		this.observeDisposer();
		console.log("Disposed.");
	}

	private async getSchedules(): Promise<any> {
		const response = await this.client.query({
			query: gql`
				query schedules {
					schedules {
						...Schedule
					}
				}
				${fragments}
				`,
			fetchPolicy: "no-cache",
		});

		return response.data.schedules; //.map((pl: any) => this.processPlaylist(pl));
	}

	private processPlaylist(playlist: any): any {
		(playlist.items as any[]).forEach((item, i) => item.index = i);
		return playlist;
	}
}
