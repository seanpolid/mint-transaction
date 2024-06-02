class TransactionDTO {
    id;
    identifier;
    amount;
    startDate;
    endDate;
    paidInAdvance;
    notes;
    category;

    constructor(id, identifier, amount, startDate, endDate, paidInAdvance, notes, category) {
        this.id = id;
        this.identifier = identifier;
        this.amount = amount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.paidInAdvance = paidInAdvance;
        this.notes = notes;
        this.category = category;
    }
}

export default TransactionDTO;