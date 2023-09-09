package application.unit_tests.dtos;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import org.junit.jupiter.api.Test;

import application.dtos.TypeDTO;

public class TypeDTOTests {

	@Test
	public void hashCode_sameFields_sameHash() {
		// Arrange
		TypeDTO typeDTO1 = new TypeDTO(1, "name");
		TypeDTO typeDTO2 = new TypeDTO(1, "name");
		
		// Act
		int typeDTO1Hash = typeDTO1.hashCode();
		int typeDTO2Hash = typeDTO2.hashCode();
		
		// Assert
		assertEquals(typeDTO1Hash, typeDTO2Hash);
	}
	
	@Test
	public void hashCode_differentFields_differentHash() {
		// Arrange
		TypeDTO typeDTO1 = new TypeDTO(1, "name");
		TypeDTO typeDTO2 = new TypeDTO(2, "name");
		
		// Act
		int typeDTO1Hash = typeDTO1.hashCode();
		int typeDTO2Hash = typeDTO2.hashCode();
		
		// Assert
		assertNotEquals(typeDTO1Hash, typeDTO2Hash);
	}
	
	@Test
	public void equals_sameFields_true() {
		// Arrange
		TypeDTO typeDTO1 = new TypeDTO(1, "name");
		TypeDTO typeDTO2 = new TypeDTO(1, "name");
		
		// Act and Assert
		assertTrue(typeDTO1.equals(typeDTO2));
	}
	
	@Test
	public void equals_differentFields_false() {
		// Arrange
		TypeDTO typeDTO1 = new TypeDTO(1, "name");
		TypeDTO typeDTO2 = new TypeDTO(2, "name");
		
		// Act and Assert
		assertFalse(typeDTO1.equals(typeDTO2));
	}
}
