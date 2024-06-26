package application.unit_tests.utilities;

import java.math.BigDecimal;
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
	private static BigDecimal bigDecimal;
	private static Category category;
	private static CategoryDTO categoryDTO;
	
	@BeforeAll
	public static void setup() {
		mapper = new Mapper();
		bigDecimal = new BigDecimal("100.00");
		category = new Category(1, "name", new Type(1, "name"));
		categoryDTO = mapper.map(category);
	}
	
	@Test
	public void map_transactionDTO2Transaction_success() {
		// Arrange
		LocalDate date = LocalDate.now();
		TransactionDTO transactionDTO = new TransactionDTO(1, "identifier", bigDecimal, date, date, false, "notes", categoryDTO);
		Transaction expected = new Transaction(1, "identifier", bigDecimal, date, date, false,"notes");
		
		// Act
		Transaction actual = mapper.map(transactionDTO);
		
		// Assert
		assertTrue(expected.equals(actual));
	}
	
	@Test
	public void map_transaction2TransactionDTO_success() {
		// Arrange
		LocalDate date = LocalDate.now();
		Transaction transaction = new Transaction(1, "identifier", bigDecimal, date, date, false, "notes");
		transaction.setCategory(category);
		TransactionDTO expected = new TransactionDTO(1, "identifier", bigDecimal, date, date, false, "notes", categoryDTO);
		
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
		
		TypeDTO typeDTO = mapper.map(type);
		CategoryDTO expected = new CategoryDTO(1, "name", typeDTO);
		
		// Act
		CategoryDTO actual = mapper.map(category);
		
		// Assert
		assertTrue(expected.equals(actual));
	}
}
