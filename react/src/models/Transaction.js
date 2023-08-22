class Transaction {
    id;
    type;
    category;
    recurs;
    startDate;
    endDate
    amount;
    notes;
    key;

    clone() {
        const transaction = new Transaction();
        transaction.id = this.id;
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