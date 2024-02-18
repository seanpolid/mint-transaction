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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import application.dtos.CategoryDTO;
import application.entities.Category;
import application.entities.Type;
import application.repositories.ICategoryRepository;
import application.repositories.ITypeRepository;
import application.services.CategoryService;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class CategoryControllerTests {

	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private ICategoryRepository categoryRepository;
	
	@Autowired
	private ITypeRepository typeRepository;
	
	@Autowired
	private CategoryService categoryService;
	
	private String expectedJson;
	
	@BeforeEach
	public void setup() throws JsonProcessingException {
		Type type = new Type(0, "name");
		type = typeRepository.save(type);
		
		List<Category> categories = List.of(
				new Category(0, "name", type),
				new Category(0, "name", type)
		);
		categoryRepository.deleteAll();				// ensures no prior categories exist
		categoryRepository.saveAll(categories);
		
		List<CategoryDTO> categoryDTOs = categoryService.getCategories();
		
		ObjectMapper mapper = new ObjectMapper();
		expectedJson = mapper.writeValueAsString(categoryDTOs);
	}
	
	@AfterEach
	public void destroy() {
		categoryRepository.deleteAll();
		typeRepository.deleteAll();
	}
	
	@Test
	public void getCategories_categoriesRetrieved_statusRedirect() throws Exception {
		mockMvc.perform(get("/api/categories"))
			   .andExpect(status().is3xxRedirection())
			   .andExpect(header().string("Location", "http://localhost/login"));
	}
	
	@Test
	@WithMockUser
	public void getCategories_categoriesRetrieved_statusOk() throws Exception {
		mockMvc.perform(get("/api/categories"))
			   .andExpectAll(
					   status().isOk(),
					   content().contentType("application/json"))
			   .andExpect(content().json(expectedJson));
	}
}
