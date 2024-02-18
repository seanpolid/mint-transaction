package application.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
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
		return http.authorizeHttpRequests((customizer) -> {
			customizer.requestMatchers("/api/**", "/").authenticated()
					  .anyRequest().permitAll();
		}).csrf((customizer) -> {
			customizer.disable();
		}).cors((customizer) -> {
			customizer.disable();
		}).oauth2Login((customizer) -> {
			customizer.loginPage("/login")
					  .defaultSuccessUrl("/");
		}).formLogin((customizer) -> {
			customizer.loginPage("/login");
		}).logout((customizer) -> {
			customizer.logoutSuccessUrl("/home");
		}).build();
	}
	
}
