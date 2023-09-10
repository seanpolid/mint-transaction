package application.unit_tests.controllers;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import application.controllers.CategoryController;
import application.dtos.CategoryDTO;
import application.services.interfaces.ICategoryService;

public class CategoryControllerTests {

	private ICategoryService mockCategoryService;
	private CategoryController categoryController;
	
	@BeforeEach
	public void setup() {
		mockCategoryService = mock(ICategoryService.class);
		categoryController = new CategoryController(mockCategoryService);
	}
	
	@Test
	public void getCategories_categoriesRetrieved_statusOk() throws Exception {
		// Arrange
		List<CategoryDTO> categoryDTOs = List.of(
				new CategoryDTO()
		);
		when(mockCategoryService.getCategories()).thenReturn(categoryDTOs);
		
		// Act
		ResponseEntity<Object> response = categoryController.getCategories();
		List<CategoryDTO> body = (List<CategoryDTO>) response.getBody();
		
		// Assert
		assertEquals(HttpStatus.OK ,response.getStatusCode());
		assertEquals(categoryDTOs, body);
	}
	
	@Test
	public void getCategories_exception_statusInternalServerError() throws Exception {
		// Arrange
		when(mockCategoryService.getCategories()).thenThrow(Exception.class);
		String expectedMessage = "Could not retrieve categories.";
		
		// Act
		ResponseEntity<Object> response = categoryController.getCategories();
		String body = (String) response.getBody();
		
		// Assert
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
		assertEquals(expectedMessage, body);
	}
}
