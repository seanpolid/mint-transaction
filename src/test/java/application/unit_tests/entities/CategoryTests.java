package application.unit_tests.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeAll;

import application.entities.Category;
import application.entities.Type;

public class CategoryTests {
	
	private static Type type;
	
	@BeforeAll
	public static void setup() {
		type = new Type(1, "name");
	}
	
	@Test
	public void hashCode_sameFields_sameHash() {
		// Arrange
		Category category1 = new Category(1, "name", type);
		Category category2 = new Category(1, "name", type);
		
		// Act
		int category1Hash = category1.hashCode();
		int category2Hash = category2.hashCode();
		
		// Assert
		assertEquals(category1Hash, category2Hash);
	}
	
	@Test
	public void hashCode_differentFields_differentHash() {
		// Arrange
		Category category1 = new Category(1, "name", type);
		Category category2 = new Category(2, "name", type);
		
		// Act
		int category1Hash = category1.hashCode();
		int category2Hash = category2.hashCode();
		
		// Assert
		assertNotEquals(category1Hash, category2Hash);
	}
	
	@Test
	public void equals_sameFields_true() {
		// Arrange
		Category category1 = new Category(1, "name", type);
		Category category2 = new Category(1, "name", type);
		
		// Act and Assert
		assertTrue(category1.equals(category2));
	}
	
	@Test
	public void equals_differentFields_false() {
		// Arrange
		Category category1 = new Category(1, "name", type);
		Category category2 = new Category(2, "name", type);
		
		// Act and Assert
		assertFalse(category1.equals(category2));
	}
}
