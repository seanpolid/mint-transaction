package application.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import application.entities.User;
import application.repositories.IUserRepository;

@Configuration
public class SecurityConfig {

	/*
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public UserDetailsService userDetailService(IUserRepository userRepository) {
		return username -> {
			User user = userRepository.findByUsername(username);
			if (user != null) {return user;}
			
			throw new UsernameNotFoundException("Could not find user with username: " + username);
		};
	}
	*/
}
