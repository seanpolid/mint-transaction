package application.integration_tests.services;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import application.dtos.UserDTO;
import application.entities.User;
import application.exceptions.EmailInUseException;
import application.exceptions.UsernameInUseException;
import application.repositories.IUserRepository;
import application.services.UserService;

@SpringBootTest
@ActiveProfiles("test")
public class UserServiceTests {

	@Autowired
	public UserService userService;
	
	@Autowired
	public IUserRepository userRepository;
	
	@AfterEach
	public void cleanup() {
		userRepository.deleteAll();
	}
	
	@Test
	public void registerUser_success() throws EmailInUseException, UsernameInUseException {
		// Arrange
		UserDTO userDTO = new UserDTO("username", "password", "email@gmail.com", "(731)111-0000");
		
		// Act
		userService.registerUser(userDTO);
		
		// Assert
		Optional<User> user = userRepository.findByUsername(userDTO.getUsername());
		assertTrue(user.isPresent());
	}
}
