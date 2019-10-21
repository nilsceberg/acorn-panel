import { observable } from "mobx";
import { PageInfo, Pages } from "./Pages";
import { NewController } from "../controllers/NewController";

export class Model {
	@observable systemMessage: string = "";
	@observable page: PageInfo = Pages.Dashboard;

	@observable rootScreens: any[] = [];
	@observable pendingRegistrations: any[] = [];
	@observable playlists: any[] = [];

	@observable newLoading = false;
	@observable screensLoading = false;
	@observable playlistsLoading = false;
	@observable playlistLoading: { [uuid: string]: boolean } = {};

	constructor() {
	}
}
