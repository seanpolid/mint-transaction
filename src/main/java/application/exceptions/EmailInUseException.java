package application.exceptions;

public class EmailInUseException extends Exception {

	private static final long serialVersionUID = 1L;

	public EmailInUseException(String email) {
		super("Could not register user with email: " + email + ". It is already in use.");
	}
	
}
