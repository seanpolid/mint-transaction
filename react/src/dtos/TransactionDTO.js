class TransactionDTO {
    id;
    identifier;
    amount;
    startDate;
    endDate;
    notes;
    category;

    constructor(id, identifier, amount, startDate, endDate, notes, category) {
        this.id = id;
        this.identifier = identifier;
        this.amount = amount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.notes = notes;
        this.category = category;
    }
}

export default TransactionDTO;