package application.unit_tests.dtos;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeAll;

import static org.junit.jupiter.api.Assertions.assertFalse;
import org.junit.jupiter.api.Test;

import application.dtos.CategoryDTO;
import application.dtos.TypeDTO;

public class CategoryDTOTests {
	
	private static TypeDTO type;
	
	@BeforeAll
	public static void setup() {
		type = new TypeDTO(1, "name");
	}

	@Test
	public void hashCode_sameFields_sameHash() {
		// Arrange
		CategoryDTO categoryDTO1 = new CategoryDTO(1, "name", type);
		CategoryDTO categoryDTO2 = new CategoryDTO(1, "name", type);
		
		// Act
		int categoryDTO1Hash = categoryDTO1.hashCode();
		int categoryDTO2Hash = categoryDTO2.hashCode();
		
		// Assert
		assertEquals(categoryDTO1Hash, categoryDTO2Hash);
	}
	
	@Test
	public void hashCode_differentFields_differentHash() {
		// Arrange
		TypeDTO type = new TypeDTO(1, "name");
		CategoryDTO categoryDTO1 = new CategoryDTO(1, "name", type);
		CategoryDTO categoryDTO2 = new CategoryDTO(2, "name", type);
		
		// Act
		int categoryDTO1Hash = categoryDTO1.hashCode();
		int categoryDTO2Hash = categoryDTO2.hashCode();
		
		// Assert
		assertNotEquals(categoryDTO1Hash, categoryDTO2Hash);
	}
	
	@Test
	public void equals_sameFields_true() {
		// Arrange
		CategoryDTO categoryDTO1 = new CategoryDTO(1, "name", type);
		CategoryDTO categoryDTO2 = new CategoryDTO(1, "name", type);
		
		// Act and Assert
		assertTrue(categoryDTO1.equals(categoryDTO2));
	}
	
	@Test
	public void equals_differentFields_false() {
		// Arrange
		CategoryDTO categoryDTO1 = new CategoryDTO(1, "name", type);
		CategoryDTO categoryDTO2 = new CategoryDTO(2, "name", type);
		
		// Act and Assert
		assertFalse(categoryDTO1.equals(categoryDTO2));
	}
}
