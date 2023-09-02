
class TransactionDTO {
    id;
    amount;
    startDate;
    endDate;
    notes;
    category;
    user;

    constructor(transaction) {
        this.id = transaction.id;
        this.amount = transaction.amount;
        this.startDate = transaction.startDate;
        this.endDate = transaction.endDate;
        this.notes = transaction.notes;
        this.category = transaction.category;
    }
}

export default TransactionDTO;
