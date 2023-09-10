package application.unit_tests.entities;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import application.entities.Category;
import application.entities.Transaction;
import application.entities.Type;
import application.entities.User;

public class TransactionTests {

	private static LocalDate date;
	private static Category category;
	
	@BeforeAll
	public static void setup() {
		date = LocalDate.now();
		category = new Category(1, "name", new Type(1, "name"));
	}
	
	@Test
	public void hashCode_sameFields_sameHash() {
		// Arrange
		User user = new User(1, "name");
		Transaction transaction1 = new Transaction(1, 100, date, date, "notes", category, user);
		Transaction transaction2 = new Transaction(1, 100, date, date, "notes", category, user);
		
		// Act
		int transaction1Hash = transaction1.hashCode();
		int transaction2Hash = transaction2.hashCode();
		
		// Assert
		assertEquals(transaction1Hash, transaction2Hash);
	}
	
	@Test
	public void hashCode_sameFieldsDifferentUser_differentHash() {
		// Arrange
		User user1 = new User(1, "name");
		User user2 = new User(2, "name");
		Transaction transaction1 = new Transaction(1, 100, date, date, "notes", category, user1);
		Transaction transaction2 = new Transaction(1, 100, date, date, "notes", category, user2);
		
		// Act
		int transaction1Hash = transaction1.hashCode();
		int transaction2Hash = transaction2.hashCode();
		
		// Assert
		assertNotEquals(transaction1Hash, transaction2Hash);
	}
	
	@Test
	public void hashCode_differentFieldsSameUser_differentHash() {
		// Arrange
		User user = new User(1, "name");
		Transaction transaction1 = new Transaction(1, 100, date, date, "notes", category, user);
		Transaction transaction2 = new Transaction(2, 100, date, date, "notes", category, user);
		
		// Act
		int transaction1Hash = transaction1.hashCode();
		int transaction2Hash = transaction2.hashCode();
		
		// Assert
		assertNotEquals(transaction1Hash, transaction2Hash);
	}
	
	@Test
	public void equals_sameFields_true() {
		// Arrange
		User user = new User(1, "name");
		Transaction transaction1 = new Transaction(1, 100, date, date, "notes", category, user);
		Transaction transaction2 = new Transaction(1, 100, date, date, "notes", category, user);
		
		// Act and Assert
		assertTrue(transaction1.equals(transaction2));
	}
	
	@Test
	public void equals_sameFieldsDifferentUser_false() {
		// Arrange
		User user1 = new User(1, "name");
		User user2 = new User(2, "name");
		Transaction transaction1 = new Transaction(1, 100, date, date, "notes", category, user1);
		Transaction transaction2 = new Transaction(1, 100, date, date, "notes", category, user2);
		
		// Act and Assert
		assertFalse(transaction1.equals(transaction2));
	}
	
	@Test
	public void equals_differentFieldsSameUser_false() {
		// Arrange
		User user = new User(1, "name");
		Transaction transaction1 = new Transaction(1, 100, date, date, "notes", category, user);
		Transaction transaction2 = new Transaction(2, 100, date, date, "notes", category, user);
		
		// Act and Assert
		assertFalse(transaction1.equals(transaction2));
	}
}
