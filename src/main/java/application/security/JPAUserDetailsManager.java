package application.security;

import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Component;

import application.entities.User;
import application.repositories.IUserRepository;

@Component
public class JPAUserDetailsManager implements UserDetailsManager {

	private final IUserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
	public JPAUserDetailsManager(IUserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> optionalUser = userRepository.findByUsername(username);
		if (optionalUser.isPresent()) {
			return optionalUser.get();
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

}
