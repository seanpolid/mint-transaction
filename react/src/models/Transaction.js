class Transaction {
    id;
    identifier;
    type;
    category
    recurs;
    startDate;
    endDate
    amount;
    notes;
    key;

    constructor(id, identifier, type, category, startDate, endDate, amount, notes, key) {
        this.id = id;
        this.identifier = identifier;
        this.type = type;
        this.category = category;
        this.startDate = startDate;
        this.endDate = endDate;
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
        transaction.amount = this.amount;
        transaction.notes = this.notes;
        transaction.key = this.key;
        return transaction;
    }
}

export default Transaction