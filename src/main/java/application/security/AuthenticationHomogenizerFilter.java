package application.security;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Collection;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import application.entities.User;
import application.enums.AuthProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthenticationHomogenizerFilter extends OncePerRequestFilter {
	
	private IJPAUserDetailsManager userDetailsManager;
	
	public AuthenticationHomogenizerFilter(IJPAUserDetailsManager userDetailsManager) {
		this.userDetailsManager = userDetailsManager;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		SecurityContext securityContext = SecurityContextHolder.getContext();
		Authentication authentication = securityContext.getAuthentication();
		
		if (authentication instanceof OAuth2AuthenticationToken) {
			OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
			Collection<GrantedAuthority> authorities = token.getAuthorities();
			
			SecurityUser securityUser = getSecurityUser(authorities);
			if (securityUser == null) {
				filterChain.doFilter(request, response);
			}
			
			var usernamePasswordToken = new UsernamePasswordAuthenticationToken(securityUser.getUser(), null, securityUser.getAuthorities());
			securityContext.setAuthentication(usernamePasswordToken);
		}
		
		filterChain.doFilter(request, response);
	}

	private SecurityUser getSecurityUser(Collection<GrantedAuthority> authorities) {
		UserInfo userInfo = getUserInfo(authorities);
		SecurityUser securityUser = null;
		
		String email = userInfo.getEmail();
		String username = email.substring(0, email.indexOf("@"));
		AuthProvider authProvider = userInfo.getAuthProvider();
		
		if (userDetailsManager.userExists(username, authProvider)) {
			securityUser = loadSecurityUser(username, authProvider);
		} else {
			User user = new User();
			user.setUsername(username);
			user.setEmail(email);
			user.setAuthProvider(authProvider);
			user.setDateCreated(LocalDate.now());
			
			securityUser = new SecurityUser(user);
			userDetailsManager.createUser(securityUser);
		}
		
		return securityUser;
	}
	
	private SecurityUser loadSecurityUser(String username, AuthProvider authProvider) {
		try {
			return (SecurityUser) userDetailsManager.loadUserByUsernameAndAuthProvider(username, authProvider);
		} catch (Exception ex) {
			return null;
		}
	}

	private UserInfo getUserInfo(Collection<GrantedAuthority> authorities) {
		String email = null;
		AuthProvider authProvider = null;
		
		for (GrantedAuthority authority : authorities) {
			if (authority instanceof OidcUserAuthority) {
				OidcUserAuthority userAuthority = (OidcUserAuthority) authority;
				
				email = (String) userAuthority.getAttributes().get("email");
			}
			if (authority.getAuthority().contains("SCOPE") && authProvider == null) {
				authProvider = getAuthProvider(authority.getAuthority());
			}
		}
		
		return new UserInfo(email, authProvider);
	}
	
	private AuthProvider getAuthProvider(String authority) {
		authority = authority.toLowerCase();
		
		if (authority.contains("google")) {
			return AuthProvider.GOOGLE;
		}
		if (authority.contains("github")) {
			return AuthProvider.GITHUB;
		}
		
		return null;
	}

	class UserInfo {
		private String email;
		private AuthProvider authProvider;
		
		public UserInfo(String email, AuthProvider authProvider) {
			this.email = email;
			this.authProvider = authProvider;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public AuthProvider getAuthProvider() {
			return authProvider;
		}

		public void setAuthProvider(AuthProvider authProvider) {
			this.authProvider = authProvider;
		}
	}

}
