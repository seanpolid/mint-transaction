export class User {
	constructor(
		public id = 0,
		public email: string,
		public username: string,
		public firstName: string,
		public dateCreated: string,
		public phone: number
	) {
		this.id = id;
		this.email = email;
		this.username = username;
		this.firstName = firstName;
		this.dateCreated = dateCreated;
		this.phone = phone;
	}
}
