package application.exceptions;

public class EmailInUseException extends Exception {

	public EmailInUseException(String email) {
		super("Could not register user with email: " + email + ". It is already in use.");
	}
	
}
