import { Cloneable } from "./Cloneable";
import { Type } from "./Type";

export class Category implements Cloneable<Category> {
	constructor(public id = 0, public name: string, public type: Type) {
		this.id = id;
		this.name = name;
		this.type = type;
	}

	clone() {
		return new Category(this.id, this.name, this.type);
	}
}
