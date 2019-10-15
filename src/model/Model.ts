import { observable } from "mobx";
import { PageInfo, Pages } from "./Pages";
import { NewController } from "../controllers/NewController";

export class Model {
	@observable systemMessage: string = "";
	@observable page: PageInfo = Pages.Dashboard;

	@observable pendingRegistrations: any[] = [];
	@observable newLoading = false;

	constructor() {
	}
}
