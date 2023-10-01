package application.unit_tests.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import application.dtos.CategoryDTO;
import application.dtos.TransactionDTO;
import application.dtos.TypeDTO;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;

public class TransactionDTOTests {

	private LocalDate date;
	private String identifier;
	private BigDecimal bigDecimal;
	private Validator validator;
	private CategoryDTO category;
	
	@BeforeEach
	public void setup() {
		date = LocalDate.now();
		identifier = java.util.UUID.randomUUID().toString();
		bigDecimal = new BigDecimal("10.00");
		validator = Validation.buildDefaultValidatorFactory().getValidator();
		category = new CategoryDTO(1, "name", new TypeDTO(1, "name"));
	}
	
	@Test
	public void hashCode_sameFields_sameHash() {
		// Arrange
		TransactionDTO transactionDTO1 = new TransactionDTO(1, identifier, bigDecimal, date, date, "notes", category);
		TransactionDTO transactionDTO2 = new TransactionDTO(1, identifier, bigDecimal, date, date, "notes", category);
		
		// Act
		int transactionDTO1Hash = transactionDTO1.hashCode();
		int transactionDTO2Hash = transactionDTO2.hashCode();
		
		// Assert
		assertEquals(transactionDTO1Hash, transactionDTO2Hash);
	}
	
	@Test
	public void hashCode_differentFields_differentHash() {
		// Arrange
		TransactionDTO transactionDTO1 = new TransactionDTO(1, identifier, bigDecimal, date, date, "notes", category);
		TransactionDTO transactionDTO2 = new TransactionDTO(2, identifier, bigDecimal, date, date, "notes", category);
		
		// Act
		int transactionDTO1Hash = transactionDTO1.hashCode();
		int transactionDTO2Hash = transactionDTO2.hashCode();
		
		// Assert
		assertNotEquals(transactionDTO1Hash, transactionDTO2Hash);
	}
	
	@Test
	public void equals_sameFields_true() {
		// Arrange
		TransactionDTO transactionDTO1 = new TransactionDTO(1, identifier, bigDecimal, date, date, "notes", category);
		TransactionDTO transactionDTO2 = new TransactionDTO(1, identifier, bigDecimal, date, date, "notes", category);
		
		// Act and Assert
		assertTrue(transactionDTO1.equals(transactionDTO2));
	}
	
	@Test
	public void equals_differentFields_false() {
		// Arrange
		TransactionDTO transactionDTO1 = new TransactionDTO(1, identifier, bigDecimal, date, date, "notes", category);
		TransactionDTO transactionDTO2 = new TransactionDTO(2, identifier, bigDecimal, date, date, "notes", category);
		
		// Act and Assert
		assertFalse(transactionDTO1.equals(transactionDTO2));
	}
	
	@Test
	public void categoryId_null_violationRaised() {
		// Arrange
		category.setId(null);
		TransactionDTO transactionDTO = new TransactionDTO(1, identifier, bigDecimal, date, date, "notes", category);
	
		// Act
		Set<ConstraintViolation<TransactionDTO>> violations = validator.validate(transactionDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
	
	@Test
	public void categoryId_lessThan1_violationRaised() {
		// Arrange
		category.setId(0);
		TransactionDTO transactionDTO = new TransactionDTO(1, identifier, bigDecimal, date, date, "notes", category);
	
		// Act
		Set<ConstraintViolation<TransactionDTO>> violations = validator.validate(transactionDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
	
	@Test 
	public void id_null_violationRaised() {
		// Arrange
		TransactionDTO transactionDTO = new TransactionDTO(null, identifier, bigDecimal, date, date, "notes", category);
	
		// Act
		Set<ConstraintViolation<TransactionDTO>> violations = validator.validate(transactionDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
	
	@Test 
	public void id_lessThan1_violationRaised() {
		// Arrange
		TransactionDTO transactionDTO = new TransactionDTO(-5, identifier, bigDecimal, date, date, "notes", category);
	
		// Act
		Set<ConstraintViolation<TransactionDTO>> violations = validator.validate(transactionDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
	
	@Test
	public void identifier_wrongSize_violationRaised() {
		// Arrange
		TransactionDTO transactionDTO = new TransactionDTO(1, "identifier", bigDecimal, date, date, "notes", category);
	
		// Act
		Set<ConstraintViolation<TransactionDTO>> violations = validator.validate(transactionDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
	
	@Test
	public void amount_negative_violationRaised() {
		// Arrange
		TransactionDTO transactionDTO = new TransactionDTO(1, identifier, new BigDecimal("-100.00"), date, date, "notes", category);
	
		// Act
		Set<ConstraintViolation<TransactionDTO>> violations = validator.validate(transactionDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
	
	@Test
	public void startDate_null_violationRaised() {
		// Arrange
		TransactionDTO transactionDTO = new TransactionDTO(1, identifier, bigDecimal, null, date, "notes", category);
	
		// Act
		Set<ConstraintViolation<TransactionDTO>> violations = validator.validate(transactionDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
	
	@Test
	public void category_null_violationRaised() {
		// Arrange
		TransactionDTO transactionDTO = new TransactionDTO(1, identifier, bigDecimal, date, date, "notes", null);
		
		// Act
		Set<ConstraintViolation<TransactionDTO>> violations = validator.validate(transactionDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
	
	@Test
	public void category_invalid_violationRaised() {
		// Arrange
		category.setId(null);
		TransactionDTO transactionDTO = new TransactionDTO(1, identifier, bigDecimal, date, date, "notes", category);
	
		// Act
		Set<ConstraintViolation<TransactionDTO>> violations = validator.validate(transactionDTO);
		
		// Assert
		assertEquals(1, violations.size());
	}
}
