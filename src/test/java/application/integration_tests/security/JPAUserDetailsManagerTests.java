package application.integration_tests.security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import application.repositories.IUserRepository;
import application.security.JPAUserDetailsManager;

public class JPAUserDetailsManagerTests {

	private IUserRepository userRepository;
	private JPAUserDetailsManager jpaUserDetailsManager;
	
	@BeforeEach
	public void setup() {
		userRepository = mock(IUserRepository.class);
		PasswordEncoder passwordEncoder = NoOpPasswordEncoder.getInstance();
		
		jpaUserDetailsManager = new JPAUserDetailsManager(userRepository, passwordEncoder);
	}
	
	@Test
	public void loadUserByUsername_userNonExistant_UsernameNotFoundException() {
		// Arrange
		when(userRepository.findByUsername(any(String.class))).thenReturn(Optional.empty());
		
		// Act and Assert
		assertThrows(UsernameNotFoundException.class, () -> {
			jpaUserDetailsManager.loadUserByUsername("username");
		});
	}

}
