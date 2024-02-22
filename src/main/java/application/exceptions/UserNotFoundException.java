package application.exceptions;

import application.enums.AuthProvider;

public class UserNotFoundException extends Exception {

	public UserNotFoundException(String username, AuthProvider authProvider) {
		super("Could not find user with username: " + username + " and auth provider: " + (authProvider == null ? "null" : authProvider.name()));
	}
}
