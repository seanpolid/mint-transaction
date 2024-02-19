package application.unit_tests.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import application.dtos.UserDTO;
import application.entities.User;
import application.exceptions.EmailInUseException;
import application.exceptions.UsernameInUseException;
import application.security.IJPAUserDetailsManager;
import application.services.UserService;

public class UserServiceTests {

	private IJPAUserDetailsManager userDetailsManager;
	private PasswordEncoder passwordEncoder;
	private UserService userService;
	private UserDTO userDTO;
	
	@BeforeEach
	public void setup() {
		userDetailsManager = mock(IJPAUserDetailsManager.class);
		passwordEncoder = new BCryptPasswordEncoder();
		userService = new UserService(userDetailsManager, passwordEncoder);
		
		userDTO = new UserDTO("username", "password", "s@email.com", "1111111111");
	}
	
	@Test
	public void registerUser_existingUsernameUsed_UsernameInUseException() {
		// Arrange
		when(userDetailsManager.userExists(any(String.class))).thenReturn(true);
		
		// Act and Assert
		assertThrows(UsernameInUseException.class, () -> {
			userService.registerUser(userDTO);
		});
	}
	
	@Test
	public void registerUser_existingEmail_EmailInUseException() {
		// Arrange
		when(userDetailsManager.userEmailInUse(any(String.class))).thenReturn(true);
		
		// Act and Assert
		assertThrows(EmailInUseException.class, () -> {
			userService.registerUser(userDTO);
		});
	}
	
	@Test
	public void registerUser_success() throws EmailInUseException, UsernameInUseException {
		// Act
		userService.registerUser(userDTO);
		
		// Assert
		verify(userDetailsManager, times(1)).createUser(any(UserDetails.class));
	}
	
	@Test
	public void convertToUser_success() {
		// Arrange
		UserDTO userDTO = new UserDTO("username", "password", "email@gmail.com", "7341110000");

		// Act
		User user = userService.convertToUser(userDTO);
		
		// Assert
		assertEquals(userDTO.getUsername(), user.getUsername());
		assertTrue(passwordEncoder.matches("password", user.getPassword()));
		assertEquals(userDTO.getEmail(), user.getEmail());
		assertEquals(Long.valueOf(userDTO.getPhone()), user.getPhone());
	}
	
	@Test
	public void extractPhoneNumber_success() {
		// Arrange
		String phone = "(734)511-1211";
		long expected = 7345111211L;
		
		// Act
		long actual = userService.extractPhoneNumber(phone);
		
		// Assert
		assertEquals(expected, actual);
	}
}
