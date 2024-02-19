package application.exceptions;

public class TransactionNotFoundException extends Exception {

	private static final long serialVersionUID = 1L;

	public TransactionNotFoundException(int transactionId) {
		super("Could not find transaction with id: " + transactionId);
	}
}
