package application.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

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
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http.authorizeHttpRequests((customizer) -> {
			customizer.anyRequest().permitAll();
		}).csrf((customizer) -> {
			customizer.disable();
		}).cors((customizer) -> {
			customizer.disable();
		}).build();
	}
}
