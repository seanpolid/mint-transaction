package application.security;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import application.entities.User;
import application.enums.AuthProvider;
import application.exceptions.UserNotFoundException;
import application.repositories.IUserRepository;

@Component
public class JPAUserDetailsManager implements IJPAUserDetailsManager {

	private final IUserRepository userRepository;
	
	public JPAUserDetailsManager(IUserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> optionalUser = userRepository.findByUsername(username);
		if (optionalUser.isPresent()) {
			return new SecurityUser(optionalUser.get());
		}
		
		throw new UsernameNotFoundException(username + " does not exist.");
	}

	@Override
	public void createUser(UserDetails user) {
		SecurityUser securityUser = (SecurityUser) user;
		userRepository.save(securityUser.getUser());
	}

	@Override
	public void updateUser(UserDetails user) {
		SecurityUser securityUser = (SecurityUser) user;
		userRepository.save(securityUser.getUser());
	}

	@Override
	public void deleteUser(String username) {
		userRepository.deleteByUsername(username);
	}

	@Override
	public void changePassword(String oldPassword, String newPassword) {
		SecurityContext context = SecurityContextHolder.getContext();
		Authentication authentication = context.getAuthentication();
		userRepository.changePassword(authentication.getName(), newPassword);
	}

	@Override
	public boolean userExists(String username) {
		Optional<User> user = userRepository.findByUsername(username);
		return user.isPresent();
	}

	@Override
	public boolean userEmailInUse(String email) {
		Optional<User> user = userRepository.findByEmail(email);
		return user.isPresent();
	}

	@Override
	public boolean userExists(String username, AuthProvider authProviderType) {
		Optional<User> optionalUser = userRepository.findByUsernameAndAuthProvider(username, authProviderType);
		return optionalUser.isPresent();
	}

	@Override
	public UserDetails loadUserByUsernameAndAuthProvider(String username, AuthProvider authProvider) throws UserNotFoundException {
		Optional<User> optionalUser = userRepository.findByUsernameAndAuthProvider(username, authProvider);
		if (optionalUser.isPresent()) {
			return new SecurityUser(optionalUser.get());
		}
		
		throw new UserNotFoundException(username, authProvider);
	}

}
