package application.exceptions;

import application.enums.AuthProvider;

public class UserNotFoundException extends Exception {

	private static final long serialVersionUID = 1L;

	public UserNotFoundException(String username, AuthProvider authProvider) {
		super("Could not find user with username: " + username + " and auth provider: " + (authProvider == null ? "null" : authProvider.name()));
	}
}
