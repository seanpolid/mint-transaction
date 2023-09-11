package application.unit_tests.controllers;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import application.controllers.TypeController;
import application.dtos.TypeDTO;
import application.entities.Type;
import application.services.interfaces.ITypeService;

public class TypeControllerTests {

	private ITypeService mockTypeService;
	private TypeController typeController;
	
	@BeforeEach
	public void setup() {
		mockTypeService = mock(ITypeService.class);
		typeController = new TypeController(mockTypeService);
	}
	
	@Test
	public void getTypes_typesRetrieved_statusOk() throws Exception {
		// Arrange
		List<TypeDTO> typeDTOs = List.of(
				new TypeDTO()
		); 
		when(mockTypeService.getTypes()).thenReturn(typeDTOs);
		
		// Act
		ResponseEntity<Object> response = typeController.getTypes();
		
		// Assert
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(typeDTOs, response.getBody());
	}
	
	@Test
	public void getTypes_exception_statusInternalServerError() throws Exception {
		// Arrange
		when(mockTypeService.getTypes()).thenThrow(Exception.class);
		String expectedMessage = "Could not retrieve types.";
				
		// Act
		ResponseEntity<Object> response = typeController.getTypes();
		
		// Assert
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
		assertEquals(expectedMessage, response.getBody());
	}
}
