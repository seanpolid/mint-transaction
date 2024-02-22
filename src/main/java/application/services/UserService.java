package application.services;

import java.time.LocalDate;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import application.dtos.UserDTO;
import application.entities.User;
import application.enums.AuthProvider;
import application.exceptions.EmailInUseException;
import application.exceptions.UsernameInUseException;
import application.security.IJPAUserDetailsManager;
import application.security.SecurityUser;
import application.services.interfaces.IUserService;

@Service
public class UserService implements IUserService {
	
	private final IJPAUserDetailsManager userDetailsManager;
	private final PasswordEncoder passwordEncoder;
	
	public UserService(IJPAUserDetailsManager userDetailsManager, PasswordEncoder passwordEncoder) {
		this.userDetailsManager = userDetailsManager;
		this.passwordEncoder = passwordEncoder;
	}
	
	public void registerUser(UserDTO userDTO) throws EmailInUseException, UsernameInUseException {
		if (userDetailsManager.userExists(userDTO.getUsername())) {
			throw new UsernameInUseException(userDTO.getUsername());
		}
		if (userDetailsManager.userEmailInUse(userDTO.getEmail())) {
			throw new EmailInUseException(userDTO.getEmail());
		}
		
		User user = convertToUser(userDTO);
		SecurityUser userDetails = new SecurityUser(user);
		userDetailsManager.createUser(userDetails);
	}

	public User convertToUser(UserDTO userDTO) {
		User user = new User();
		user.setUsername(userDTO.getUsername());		
		user.setEmail(userDTO.getEmail());
		user.setDateCreated(LocalDate.now());
		user.setAuthProvider(AuthProvider.NONE);
		
		String password = passwordEncoder.encode(userDTO.getPassword());
		user.setPassword(password);
		
		Long phone = userDTO.getPhone() == null ? null : extractPhoneNumber(userDTO.getPhone());
		user.setPhone(phone);
		
		return user;
	}

	public Long extractPhoneNumber(String phone) {
		StringBuilder builder = new StringBuilder();
		for (char c : phone.toCharArray()) {
			if (c >= '0' && c <= '9') {
				builder.append(c);
			}
		}
		
		return Long.valueOf(builder.toString());
	}

}
