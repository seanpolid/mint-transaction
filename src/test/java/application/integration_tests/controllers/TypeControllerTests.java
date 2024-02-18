package application.integration_tests.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import application.dtos.TypeDTO;
import application.entities.Type;
import application.repositories.ITypeRepository;
import application.services.interfaces.ITypeService;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class TypeControllerTests {

	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private ITypeRepository typeRepository;
	
	@Autowired
	private ITypeService typeService;
	
	private String expectedJson;
	
	@BeforeEach
	public void setup() throws Exception {
		List<Type> types = List.of(
				new Type(0, "name"),
				new Type(0, "name")
		);
		typeRepository.saveAll(types);
		
		List<TypeDTO> typeDTOs = typeService.getTypes();
		
		ObjectMapper mapper = new ObjectMapper();
		expectedJson = mapper.writeValueAsString(typeDTOs);
	}
	
	@AfterEach
	public void destroy() {
		typeRepository.deleteAll();
	}
	
	@Test
	public void getTypes_typesRetrieved_statusRedirect() throws Exception {
		mockMvc.perform(get("/api/types"))
			   .andExpect(status().is3xxRedirection())
			   .andExpect(header().string("Location", "http://localhost/login"));
	}
	
	@Test
	@WithMockUser
	public void getTypes_typesRetrieved_statusOk() throws Exception {
		mockMvc.perform(get("/api/types"))
			   .andExpectAll(status().isOk(),
					   		 content().contentType("application/json"))
			   .andExpect(content().json(expectedJson));
	}
}
