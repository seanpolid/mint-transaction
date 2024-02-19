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
}
