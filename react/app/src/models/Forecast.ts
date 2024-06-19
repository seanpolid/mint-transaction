import { Cloneable } from "./Cloneable";

export class Forecast implements Cloneable<Forecast> {
	constructor(
		public id = 0,
		public name: string,
		public amount: number,
		public startDate: string,
		public endDate: string,
		public notes: string
	) {
		this.id = id;
		this.name = name;
		this.amount = amount;
		this.startDate = startDate;
		this.endDate = endDate;
		this.notes = notes;
	}

	clone(): Forecast {
		return new Forecast(
			this.id,
			this.name,
			this.amount,
			this.startDate,
			this.endDate,
			this.notes
		);
	}
}
