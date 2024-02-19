package application.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class SecurityConfig {
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http.csrf((customizer) -> {
			customizer.disable();
		}).cors((customizer) -> {
			customizer.disable();
		}).authorizeHttpRequests((customizer) -> {
			customizer.requestMatchers("/login/**", "/api/user", "/home*", "/exceptions/**").permitAll()
			  		  .anyRequest().authenticated();
		}).oauth2Login((customizer) -> {
			customizer.loginPage("/login")
					  .defaultSuccessUrl("/transactions/add");
		}).formLogin((customizer) -> {
			customizer.loginPage("/login");
		}).logout((customizer) -> {
			customizer.logoutSuccessUrl("/home");
		}).build();
	}
	
}
