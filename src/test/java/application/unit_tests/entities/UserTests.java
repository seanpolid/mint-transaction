package application.unit_tests.entities;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import application.entities.User;

public class UserTests {

	private static LocalDate date;
	private static Long phone;
	
	@BeforeAll
	public static void setup() {
		date = LocalDate.now();
		phone = Long.valueOf(123456789);
	}
	
	@Test
	public void hashCode_sameFields_sameHash() {
		// Arrange
		User user1 = new User(1, "email", "username", "name", "password", date, phone);
		User user2 = new User(1, "email", "username", "name", "password", date, phone);
		
		// Act
		int user1Hash = user1.hashCode();
		int user2Hash = user2.hashCode();
		
		// Assert
		assertEquals(user1Hash, user2Hash);
	}
	
	@Test
	public void hashCode_differentFields_differentHash() {
		// Arrange
		User user1 = new User(1, "email", "username", "name", "password", date, phone);
		User user2 = new User(2, "email", "username", "name", "password", date, phone);
		
		// Act
		int user1Hash = user1.hashCode();
		int user2Hash = user2.hashCode();
		
		// Assert
		assertNotEquals(user1Hash, user2Hash);
	}
	
	@Test
	public void equals_sameFields_true() {
		// Arrange
		User user1 = new User(1, "email", "username", "name", "password", date, phone);
		User user2 = new User(1, "email", "username", "name", "password", date, phone);
				
		// Act and Assert
		assertTrue(user1.equals(user2));
	}
	
	@Test
	public void equals_differentFields_false() {
		// Arrange
		User user1 = new User(1, "email", "username", "name", "password", date, phone);
		User user2 = new User(2, "email", "username", "name", "password", date, phone);
		
		// Act and Assert
		assertFalse(user1.equals(user2));
	}
}
