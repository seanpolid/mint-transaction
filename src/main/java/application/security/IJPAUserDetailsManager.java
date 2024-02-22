package application.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.UserDetailsManager;

import application.enums.AuthProvider;
import application.exceptions.UserNotFoundException;

public interface IJPAUserDetailsManager extends UserDetailsManager {
	
	public UserDetails loadUserByUsernameAndAuthProvider(String username, AuthProvider authProvider) throws UserNotFoundException;
	public boolean userEmailInUse(String email);
	public boolean userExists(String username, AuthProvider authProviderType);
	
}
