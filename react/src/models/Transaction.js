class Transaction {
    id;
    identifier;
    typeId;
    typeName;
    categoryId;
    categoryName;
    recurs;
    startDate;
    endDate
    amount;
    notes;
    key;

    constructor(id, identifier, categoryId, startDate, endDate, amount, notes, key) {
        this.id = id;
        this.identifier = identifier;
        this.categoryId = categoryId;
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
        transaction.typeId = this.typeId;
        transaction.typeName = this.typeName;
        transaction.categoryId = this.categoryId;
        transaction.categoryName = this.categoryName;
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