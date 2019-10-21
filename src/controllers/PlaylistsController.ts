import ApolloClient, { gql } from "apollo-boost";
import { Model } from "../model/Model";
import { Pages } from "../model/Pages";
import { autorun, observe, Lambda } from "mobx";
import { sleep } from "../util/async";

const fragments = gql`
fragment Playlist on Playlist {
	uuid
	name
	items {
		name
		type
	}
}
`;

export class PlaylistsController {
	private client: ApolloClient<any>;
	private model: Model;

	private observeDisposer: Lambda;

	constructor(model: Model) {
		this.model = model;
		this.client = new ApolloClient({
			uri: AcornConfig.api
		});

		this.observeDisposer = observe(model, "page", async (change) => {
			if (change.newValue.identifier === Pages.Playlists.identifier && change.newValue.identifier !== change.oldValue.identifier) {
				model.playlistsLoading = true;
				const playlists = await this.getPlaylists();
				console.log(playlists);
				model.playlists = playlists;
				model.playlistsLoading = false;
			}
		});
	}

	public dispose() {
		this.observeDisposer();
		console.log("Disposed.");
	}

	public async editPlaylistItem(playlist: any, newItem: any, oldItem: any) {
		//this.model.playlistsLoading = true;
		const response = await this.client.mutate({
			mutation: gql`
			mutation renameItem($playlist: ID!, $index: Int!, $name: String!) {
				renamePlaylistItem(playlist: $playlist, index: $index, name: $name) {
					...Playlist
				}
			}
			${fragments}
			`,
			variables: {
				playlist: playlist.uuid,
				index: newItem.index,
				name: newItem.name,
			},
			fetchPolicy: "no-cache",
		});

		Object.assign(
			this.model.playlists.find(p => p.uuid === playlist.uuid),
			this.processPlaylist(response.data.renamePlaylistItem));
		//this.model.playlistsLoading = false;
	}

	public async movePlaylistItem(playlist: any, item: any, direction: 1 | -1) {
		this.model.playlistLoading[playlist.uuid] = true;
		const response = await this.client.mutate({
			mutation: gql`
			mutation ($playlist: ID!, $index: Int!, $newIndex: Int!) {
				movePlaylistItem(playlist: $playlist, index: $index, newIndex: $newIndex) {
					...Playlist
				}
			}
			${fragments}
			`,
			variables: {
				playlist: playlist.uuid,
				index: item.index,
				newIndex: item.index + direction,
			},
			fetchPolicy: "no-cache",
		});

		Object.assign(
			this.model.playlists.find(p => p.uuid === playlist.uuid),
			this.processPlaylist(response.data.movePlaylistItem));
		this.model.playlistLoading[playlist.uuid] = false;
	}

	private async getPlaylists(): Promise<any> {
		const response = await this.client.query({
			// We recurse to some max depth, and then require a new fetch if we want to load deeper
			query: gql`
				query playlists {
					playlists {
						...Playlist
					}
				}
				${fragments}
				`,
			fetchPolicy: "no-cache",
		});

		return response.data.playlists.map((pl: any) => this.processPlaylist(pl));
	}

	private processPlaylist(playlist: any): any {
		(playlist.items as any[]).forEach((item, i) => item.index = i);
		return playlist;
	}
}
