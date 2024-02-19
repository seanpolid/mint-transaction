package application.exceptions;

public class UsernameInUseException extends Exception {

	public UsernameInUseException(String username) {
		super("Could not register user with username: " + username + ". It is already in use.");
	}

}
