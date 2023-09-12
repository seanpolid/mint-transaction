package application.unit_tests.utilities;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import application.dtos.CategoryDTO;
import application.dtos.TransactionDTO;
import application.dtos.TypeDTO;
import application.entities.Category;
import application.entities.Transaction;
import application.entities.Type;
import application.utilities.Mapper;

public class MapperTests {

	private static Mapper mapper;
	
	@BeforeAll
	public static void setup() {
		mapper = new Mapper();
	}
	
	@Test
	public void map_transactionDTO2Transaction_success() {
		// Arrange
		LocalDate date = LocalDate.now();
		TransactionDTO transactionDTO = new TransactionDTO(1, "identifier", 100, date, date, "notes", "category");
		Transaction expected = new Transaction(1, "identifier", 100, date, date, "notes");
		
		// Act
		Transaction actual = mapper.map(transactionDTO);
		
		// Assert
		assertTrue(expected.equals(actual));
	}
	
	@Test
	public void map_transaction2TransactionDTO_success() {
		// Arrange
		LocalDate date = LocalDate.now();
		Transaction transaction = new Transaction(1, "identifier", 100, date, date, "notes");
		TransactionDTO expected = new TransactionDTO(1, "identifier", 100, date, date, "notes", null);
		
		// Act
		TransactionDTO actual = mapper.map(transaction);
		
		// Assert
		assertTrue(expected.equals(actual));
	}
	
	@Test
	public void map_type2TypeDTO_success() {
		// Arrange
		Type type = new Type(1, "name");
		TypeDTO expected = new TypeDTO(1, "name");
		
		// Act
		TypeDTO actual = mapper.map(type);
		
		// Assert
		assertTrue(expected.equals(actual));
	}
	
	@Test
	public void map_category2CategoryDTO_success() {
		// Arrange
		Type type = new Type(1, "name");
		Category category = new Category(1, "name", type);
		CategoryDTO expected = new CategoryDTO(1, "name", type.getName());
		
		// Act
		CategoryDTO actual = mapper.map(category);
		
		// Assert
		assertTrue(expected.equals(actual));
	}
}