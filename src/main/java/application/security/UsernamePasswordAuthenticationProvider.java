package application.security;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;

import application.enums.AuthProvider;

public class UsernamePasswordAuthenticationProvider implements AuthenticationProvider {
	
	private IJPAUserDetailsManager userDetailsManager;
	private PasswordEncoder passwordEncoder;
	
	public UsernamePasswordAuthenticationProvider(IJPAUserDetailsManager userDetailsManager, PasswordEncoder passwordEncoder) {
		this.userDetailsManager = userDetailsManager;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String username = authentication.getName();
		String password = (String) authentication.getCredentials();
		
		
		if (userDetailsManager.userExists(username, AuthProvider.NONE)) {
			SecurityUser securityUser = loadSecurityUser(username);
			if (securityUser != null && passwordEncoder.matches(password, securityUser.getPassword())) {
				return new UsernamePasswordAuthenticationToken(securityUser.getUser(), null, securityUser.getAuthorities());
			}
		}
		
		throw new BadCredentialsException("Could not authenticate user: " + username);
	}
	
	private SecurityUser loadSecurityUser(String username) {
		try {
			return (SecurityUser) userDetailsManager.loadUserByUsernameAndAuthProvider(username, AuthProvider.NONE);
		} catch (Exception ex) {
			return null;
		}
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

}
