package application.exceptions;

public class TransactionNotFoundException extends Exception {

	public TransactionNotFoundException(int transactionId) {
		super("Could not find transaction with id: " + transactionId);
	}
}
