package application.unit_tests.dtos;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Set;

import org.junit.jupiter.api.BeforeEach;

import static org.junit.jupiter.api.Assertions.assertFalse;
import org.junit.jupiter.api.Test;

import application.dtos.TypeDTO;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;

public class TypeDTOTests {
	
	private Validator validator;
	
	@BeforeEach
	public void setup() {
		validator = Validation.buildDefaultValidatorFactory().getValidator();
	}

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
	
	@Test
	public void id_null_violationRaised() {
		// Arrange
		TypeDTO typeDTO = new TypeDTO(null, "name");
		
		// Act
		Set<ConstraintViolation<TypeDTO>> violations = validator.validate(typeDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
	
	@Test
	public void id_lessThan1_violationRaised() {
		// Arrange
		TypeDTO typeDTO = new TypeDTO(0, "name");
		
		// Act
		Set<ConstraintViolation<TypeDTO>> violations = validator.validate(typeDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
	
	@Test
	public void name_null_violationRaised() {
		// Arrange
		TypeDTO typeDTO = new TypeDTO(1, null);
		
		// Act
		Set<ConstraintViolation<TypeDTO>> violations = validator.validate(typeDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
	
	@Test
	public void name_empty_violationRaised() {
		// Arrange
		TypeDTO typeDTO = new TypeDTO(1, "");
		
		// Act
		Set<ConstraintViolation<TypeDTO>> violations = validator.validate(typeDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
}
