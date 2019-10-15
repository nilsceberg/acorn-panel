import { observable } from "mobx";

export class Model {
	@observable systemMessage: string = "";

	constructor() {
	}
}
