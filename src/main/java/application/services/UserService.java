package application.services;

import java.time.LocalDate;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;

import application.dtos.UserDTO;
import application.entities.User;
import application.models.RegistrationForm;
import application.security.SecurityUser;

@Service
public class UserService {
	
	private final UserDetailsManager userDetailsManager;
	private final PasswordEncoder passwordEncoder;
	
	public UserService(UserDetailsManager userDetailsManager, PasswordEncoder passwordEncoder) {
		this.userDetailsManager = userDetailsManager;
		this.passwordEncoder = passwordEncoder;
	}

	public void registerUser(RegistrationForm form) {
		User user = convertToUser(form);
		SecurityUser userDetails = new SecurityUser(user);
		userDetailsManager.createUser(userDetails);
	}
	
	private User convertToUser(RegistrationForm form) {
		User user = new User();
		user.setUsername(form.getUsername());
		user.setPassword(passwordEncoder.encode(form.getPassword()));
		user.setEmail(form.getEmail());
		user.setDateCreated(LocalDate.now());
		
		Long phone = extractPhoneNumber(form.getPhone());
		user.setPhone(phone);
		
		return user;
	}

	private Long extractPhoneNumber(String phone) {
		StringBuilder builder = new StringBuilder();
		for (char c : phone.toCharArray()) {
			if (c >= '0' && c <= '9') {
				builder.append(c);
			}
		}
		
		return Long.valueOf(builder.toString());
	}
	
	public void registerUser(UserDTO userDTO) {
		User user = convertToUser(userDTO);
		SecurityUser userDetails = new SecurityUser(user);
		userDetailsManager.createUser(userDetails);
	}

	private User convertToUser(UserDTO userDTO) {
		User user = new User();
		user.setUsername(userDTO.getUsername());
		user.setPassword(userDTO.getPassword());
		user.setEmail(userDTO.getEmail());
		user.setDateCreated(LocalDate.now());
		
		Long phone = extractPhoneNumber(userDTO.getPhone());
		user.setPhone(phone);
		
		return user;
	}

}
