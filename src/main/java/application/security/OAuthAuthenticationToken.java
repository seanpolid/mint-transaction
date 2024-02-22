package application.security;

import java.util.Collection;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import application.entities.User;

public class OAuthAuthenticationToken implements Authentication {
	
	private static final long serialVersionUID = 1L;
	private final User user;
	private final Object credentials;
	private final Collection<? extends GrantedAuthority> authorities;
	private boolean isAuthenticated;
	
	public OAuthAuthenticationToken(User user, Object credentials, Collection<? extends GrantedAuthority> authorities) {
		this.user = user;
		this.credentials = credentials;
		this.authorities = authorities;
		this.isAuthenticated = true;
	}

	@Override
	public String getName() {
		return user.getUsername();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public Object getCredentials() {
		return credentials;
	}

	@Override
	public Object getDetails() {
		return null;
	}

	@Override
	public Object getPrincipal() {
		return user;
	}

	@Override
	public boolean isAuthenticated() {
		return isAuthenticated;
	}

	@Override
	public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
		this.isAuthenticated = isAuthenticated;
	}

}
