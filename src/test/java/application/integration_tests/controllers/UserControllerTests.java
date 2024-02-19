package application.integration_tests.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.flywaydb.core.internal.util.JsonUtils;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import application.controllers.UserController;
import application.dtos.UserDTO;
import application.repositories.IUserRepository;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class UserControllerTests {

	@Autowired
	private UserController userController;
	
	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private IUserRepository userRepository;
	
	@AfterEach
	public void cleanup() {
		userRepository.deleteAll();
	}
	
	@Test
	public void createUser_success() throws Exception {
		UserDTO userDTO = new UserDTO("username", "password", "email@gmail.com", "734-111-0111");
		
		mockMvc.perform(post("/api/user").contentType(MediaType.APPLICATION_JSON)
										 .content(new ObjectMapper()
										 .writeValueAsString(userDTO)))
			   .andExpect(status().isCreated());
	}
}
