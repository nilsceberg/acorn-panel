import { observable } from "mobx";
import { PageInfo, Pages } from "./Pages";

export class Model {
	@observable systemMessage: string = "";
	@observable page: PageInfo;

	constructor() {
		this.page = Pages.Dashboard;
	}
}
