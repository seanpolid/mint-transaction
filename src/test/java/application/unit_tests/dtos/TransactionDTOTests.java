package application.unit_tests.dtos;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import application.dtos.TransactionDTO;

public class TransactionDTOTests {

	private static LocalDate date;
	
	@BeforeAll
	public static void setup() {
		date = LocalDate.now();
	}
	
	@Test
	public void hashCode_sameFields_sameHash() {
		// Arrange
		TransactionDTO transactionDTO1 = new TransactionDTO(1, 100, date, date, "notes", "category");
		TransactionDTO transactionDTO2 = new TransactionDTO(1, 100, date, date, "notes", "category");
		
		// Act
		int transactionDTO1Hash = transactionDTO1.hashCode();
		int transactionDTO2Hash = transactionDTO2.hashCode();
		
		// Assert
		assertEquals(transactionDTO1Hash, transactionDTO2Hash);
	}
	
	@Test
	public void hashCode_differentFields_differentHash() {
		// Arrange
		TransactionDTO transactionDTO1 = new TransactionDTO(1, 100, date, date, "notes", "category");
		TransactionDTO transactionDTO2 = new TransactionDTO(2, 100, date, date, "notes", "category");
		
		// Act
		int transactionDTO1Hash = transactionDTO1.hashCode();
		int transactionDTO2Hash = transactionDTO2.hashCode();
		
		// Assert
		assertNotEquals(transactionDTO1Hash, transactionDTO2Hash);
	}
	
	@Test
	public void equals_sameFields_true() {
		// Arrange
		TransactionDTO transactionDTO1 = new TransactionDTO(1, 100, date, date, "notes", "category");
		TransactionDTO transactionDTO2 = new TransactionDTO(1, 100, date, date, "notes", "category");
		
		// Act and Assert
		assertTrue(transactionDTO1.equals(transactionDTO2));
	}
	
	@Test
	public void equals_differentFields_false() {
		// Arrange
		TransactionDTO transactionDTO1 = new TransactionDTO(1, 100, date, date, "notes", "category");
		TransactionDTO transactionDTO2 = new TransactionDTO(2, 100, date, date, "notes", "category");
		
		// Act and Assert
		assertFalse(transactionDTO1.equals(transactionDTO2));
	}
}
