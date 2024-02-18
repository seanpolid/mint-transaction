package application.integration_tests.security;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import application.entities.User;
import application.security.SecurityUser;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class AuthenticationTests {

	@Autowired
	private MockMvc mvc;
	
	@Autowired
	private UserDetailsManager userDetailsManager;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@BeforeEach
	public void setup() {
		String password = passwordEncoder.encode("password");
		User user = new User(0, "email", "user", password, LocalDate.now(), null);
		SecurityUser userDetails = new SecurityUser(user);
		userDetailsManager.createUser(userDetails);
	}
	
	@Test
	public void login_success() throws Exception {
		mvc.perform(formLogin().user("user").password("password"))
		   .andExpect(status().isFound())
		   .andExpect(authenticated());
	}
}
