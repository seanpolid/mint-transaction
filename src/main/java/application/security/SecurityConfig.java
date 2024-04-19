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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
	CorsConfigurationSource corsConfigurationSource() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		
		CorsConfiguration config = new CorsConfiguration();
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");
		config.addAllowedOrigin("http://localhost:5173/");
		config.setAllowCredentials(true);
		source.registerCorsConfiguration("/**", config);
		
		return source;
	}
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http, OAuthConversionFilter oauthConversionFilter, CorsConfigurationSource corsConfigurationSource) throws Exception {
		return http.csrf((customizer) -> {
			customizer.disable();
		}).cors((customizer) -> {
			customizer.disable();
		}).cors((customizer) -> {
			customizer.configurationSource(corsConfigurationSource);
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
		}).addFilterAfter(oauthConversionFilter, OAuth2LoginAuthenticationFilter.class).build();
	}
	
}
