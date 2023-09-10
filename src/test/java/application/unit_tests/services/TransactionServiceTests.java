package application.unit_tests.services;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;

import application.dtos.TransactionDTO;
import application.entities.Category;
import application.entities.Transaction;
import application.exceptions.CategoryNotFoundException;
import application.repositories.ICategoryRepository;
import application.repositories.ITransactionRepository;
import application.services.TransactionService;
import application.utilities.IMapper;

public class TransactionServiceTests {

	private ITransactionRepository mockTransactionRepository;
	private ICategoryRepository mockCategoryRepository;
	private IMapper mockMapper;
	private TransactionService transactionService;
	
	@BeforeEach
	public void setup() {
		mockTransactionRepository = mock(ITransactionRepository.class);
		mockCategoryRepository = mock(ICategoryRepository.class);
		mockMapper = mock(IMapper.class);
		transactionService = new TransactionService(mockTransactionRepository, 
													mockCategoryRepository,
													mockMapper);
	}
	
	@Test
	public void saveTransactions_categoryFound_success() throws Exception {
		// Arrange
		TransactionDTO transactionDTO = new TransactionDTO();
		transactionDTO.setCategory("name");
		List<TransactionDTO> transactionDTOs = List.of(
				transactionDTO,
				transactionDTO
		);
		List<Transaction> transactions = List.of(
				new Transaction(),
				new Transaction()
		);
		when(mockCategoryRepository.findByNameIgnoreCase(anyString())).thenReturn(new Category());
		when(mockMapper.map(any(TransactionDTO.class))).thenReturn(new Transaction());
		when(mockTransactionRepository.saveAll(any())).thenReturn(transactions);
		when(mockMapper.map(any(Transaction.class))).thenReturn(new TransactionDTO(1));
		
		// Act
		List<TransactionDTO> savedTransactionDTOs = transactionService.saveTransactions(transactionDTOs);
		
		// Assert
		assertEquals(savedTransactionDTOs.size(), transactions.size());
		for (TransactionDTO savedTransactionDTO : savedTransactionDTOs) {
			assertNotEquals(0, savedTransactionDTO.getId());
		}
	}
	
	@Test
	public void saveTransactions_categoryNotFound_failure() {
		// Arrange
		List<TransactionDTO> transactionDTOs = List.of(new TransactionDTO());
		when(mockCategoryRepository.findByNameIgnoreCase(anyString())).thenReturn(null);
		
		// Act and Assert
		assertThrows(CategoryNotFoundException.class, () -> transactionService.saveTransactions(transactionDTOs));
	}
	
	@Test
	public void getTransactions_twoTransactionsSaved_success() {
		// Arrange
		List<Transaction> transactions = List.of(
				new Transaction(),
				new Transaction()
		);
		when(mockTransactionRepository.findAllByUserId(anyInt())).thenReturn(transactions);
		when(mockMapper.map(any(Transaction.class))).thenReturn(new TransactionDTO());
		
		// Act
		List<TransactionDTO> transactionDTOs = transactionService.getTransactions(1);
		
		// Assert
		assertEquals(transactionDTOs.size(), transactions.size());
	}
	
	@Test
	public void getTransactions_zeroTransactionsSaved_success() {
		// Arrange
		List<Transaction> transactions = new ArrayList<>();
		when(mockTransactionRepository.findAllByUserId(anyInt())).thenReturn(transactions);
		when(mockMapper.map(any(Transaction.class))).thenReturn(new TransactionDTO());
		
		// Act
		List<TransactionDTO> transactionDTOs = transactionService.getTransactions(1);
		
		// Assert
		assertTrue(transactionDTOs.size() == 0);
	}
}
