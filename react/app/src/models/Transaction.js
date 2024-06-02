class Transaction {
    id;
    identifier;
    type;
    category
    recurs;
    startDate;
    endDate;
    paidInAdvance;
    amount;
    notes;
    key;

    constructor(id, identifier, type, category, startDate, endDate, paidInAdvance, amount, notes, key) {
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
        const transaction = new Transaction();
        transaction.id = this.id;
        transaction.identifier = this.identifier;
        transaction.type = this.type;
        transaction.category = this.category;
        transaction.recurs = this.recurs;
        transaction.startDate = this.startDate;
        transaction.endDate = this.endDate;
        transaction.paidInAdvance = this.paidInAdvance;
        transaction.amount = this.amount;
        transaction.notes = this.notes;
        transaction.key = this.key;
        return transaction;
    }

    toString() {
        return `${this.type.name} ${this.category.name} ${this.startDate} ${this.endDate} $${this.amount} ${this.notes}`;
    }
}

export default Transaction