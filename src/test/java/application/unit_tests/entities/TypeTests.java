package application.unit_tests.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import org.junit.jupiter.api.Test;

import application.entities.Type;

public class TypeTests {

	@Test
	public void hashCode_sameFields_sameHash() {
		// Arrange
		Type type1 = new Type(1, "name");
		Type type2 = new Type(1, "name");
		
		// Act
		int type1Hash = type1.hashCode();
		int type2Hash = type2.hashCode();
		
		// Arrange
		assertEquals(type1Hash, type2Hash);
	}
	
	@Test
	public void hashCode_differentFields_differentHash() {
		// Arrange
		Type type1 = new Type(1, "name");
		Type type2 = new Type(2, "name");
		
		// Act
		int type1Hash = type1.hashCode();
		int type2Hash = type2.hashCode();
		
		// Arrange
		assertNotEquals(type1Hash, type2Hash);
	}
	
	@Test
	public void equals_sameFields_true() {
		// Arrange
		Type type1 = new Type(1, "name");
		Type type2 = new Type(1, "name");
		
		// Act and Assert
		assertTrue(type1.equals(type2));
	}
	
	@Test
	public void equals_differentFields_false() {
		// Arrange
		Type type1 = new Type(1, "name");
		Type type2 = new Type(2, "name");
		
		// Act and Assert
		assertFalse(type1.equals(type2));
	}
}
