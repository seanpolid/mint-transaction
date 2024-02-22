package application.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;

import application.repositories.IUserRepository;

@Configuration
public class SecurityConfig {
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	IJPAUserDetailsManager userDetailsManager(IUserRepository userRepository) {
		return new JPAUserDetailsManager(userRepository);
	}
	
	@Bean
	UsernamePasswordAuthenticationProvider usernamePasswordAuthenticationProvider(IJPAUserDetailsManager userDetailsManager) {
		return new UsernamePasswordAuthenticationProvider(userDetailsManager, passwordEncoder());
	}
	
	@Bean
	AuthenticationManager authenticationManager(HttpSecurity http, UsernamePasswordAuthenticationProvider authenticationProvider) throws Exception {
		AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
		authenticationManagerBuilder.authenticationProvider(authenticationProvider);
		return authenticationManagerBuilder.build();
	}
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http, AuthenticationHomogenizerFilter authenticationHomogenizerFilter) throws Exception {
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
		}).addFilterAfter(authenticationHomogenizerFilter, OAuth2LoginAuthenticationFilter.class).build();
	}
	
}
