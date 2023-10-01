package application.unit_tests.dtos;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Set;

import org.junit.jupiter.api.BeforeEach;

import static org.junit.jupiter.api.Assertions.assertFalse;
import org.junit.jupiter.api.Test;

import application.dtos.CategoryDTO;
import application.dtos.TypeDTO;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;

public class CategoryDTOTests {
	
	private TypeDTO type;
	private Validator validator;
	
	@BeforeEach
	public void setup() {
		type = new TypeDTO(1, "name");
		validator = Validation.buildDefaultValidatorFactory().getValidator();
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
	
	@Test
	public void id_null_violationRaised() {
		// Arrange
		CategoryDTO categoryDTO = new CategoryDTO(null, "name", type);
		
		// Act
		Set<ConstraintViolation<CategoryDTO>> violations = validator.validate(categoryDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
	
	@Test
	public void id_lessThan1_violationRaised() {
		// Arrange
		CategoryDTO categoryDTO = new CategoryDTO(0, "name", type);
		
		// Act
		Set<ConstraintViolation<CategoryDTO>> violations = validator.validate(categoryDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
	
	@Test
	public void name_null_violationRaised() {
		// Arrange
		CategoryDTO categoryDTO = new CategoryDTO(1, null, type);
		
		// Act
		Set<ConstraintViolation<CategoryDTO>> violations = validator.validate(categoryDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
	
	@Test
	public void name_empty_violationRaised() {
		// Arrange
		CategoryDTO categoryDTO = new CategoryDTO(1, "", type);
		
		// Act
		Set<ConstraintViolation<CategoryDTO>> violations = validator.validate(categoryDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
	
	@Test
	public void type_null_violationRaised() {
		// Arrange
		CategoryDTO categoryDTO = new CategoryDTO(1, "name", null);
		
		// Act
		Set<ConstraintViolation<CategoryDTO>> violations = validator.validate(categoryDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
	
	@Test
	public void type_invalid_violationRaised() {
		// Arrange
		type.setName("");
		CategoryDTO categoryDTO = new CategoryDTO(1, "name", type);
		
		// Act
		Set<ConstraintViolation<CategoryDTO>> violations = validator.validate(categoryDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
}
