import { Category } from "./Category";
import { Cloneable } from "./Cloneable";
import { Type } from "./Type";

export class Transaction implements Cloneable<Transaction> {
	constructor(
		public id = 0,
		public identifier: string,
		public type: Type,
		public category: Category | null,
		public recurs: boolean,
		public startDate: string | null,
		public endDate: string | null,
		public paidInAdvance: boolean,
		public amount: number | null,
		public notes: string,
		public key?: string
	) {
		this.id = id;
		this.identifier = identifier;
		this.type = type;
		this.category = category;
		this.startDate = startDate;
		this.endDate = endDate;
		this.paidInAdvance = paidInAdvance;
		this.amount = amount;
		this.notes = notes;
		this.key = key;
	}

	clone() {
		return new Transaction(
			this.id,
			this.identifier,
			this.type,
			this.category,
			this.recurs,
			this.startDate,
			this.endDate,
			this.paidInAdvance,
			this.amount,
			this.notes,
			this.key
		);
	}

	toString() {
		return `${this.type.name} ${this.category?.name} ${this.startDate} ${this.endDate} $${this.amount} ${this.notes}`;
	}
}
