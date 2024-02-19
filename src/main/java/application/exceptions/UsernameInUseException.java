package application.exceptions;

public class UsernameInUseException extends Exception {

	private static final long serialVersionUID = 1L;

	public UsernameInUseException(String username) {
		super("Could not register user with username: " + username + ". It is already in use.");
	}

}
