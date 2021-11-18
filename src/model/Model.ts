import { observable } from "mobx";
import { PageInfo, Pages } from "./Pages";
import { NewController } from "../controllers/NewController";

export class Model {
	@observable systemMessage: string = "";
	@observable page: PageInfo = Pages.Dashboard;

	@observable rootScreens: any[] = [];
	@observable pendingRegistrations: any[] = [];
	@observable playlists: any[] = [];
	@observable schedules: any[] = [];

	@observable newLoading = false;
	@observable screensLoading = false;
	@observable playlistsLoading = false;
	@observable schedulesLoading = false;
	@observable playlistLoading: { [uuid: string]: boolean } = {};

	constructor() {
	}
}
