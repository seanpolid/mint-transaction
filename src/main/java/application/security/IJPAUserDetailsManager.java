package application.security;

import org.springframework.security.provisioning.UserDetailsManager;

public interface IJPAUserDetailsManager extends UserDetailsManager {

	public boolean userEmailInUse(String email);
	
}
