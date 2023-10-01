package application.unit_tests.services;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;

import application.dtos.CategoryDTO;
import application.dtos.TransactionDTO;
import application.entities.Category;
import application.entities.Transaction;
import application.entities.User;
import application.exceptions.CategoryNotFoundException;
import application.exceptions.InvalidTransactionIdentifierException;
import application.exceptions.TransactionNotFoundException;
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
		transactionDTO.setCategory(new CategoryDTO(1, "name", null));
		List<TransactionDTO> transactionDTOs = List.of(
				transactionDTO,
				transactionDTO
		);
		List<Transaction> transactions = List.of(
				new Transaction(),
				new Transaction()
		);
		when(mockCategoryRepository.findById(anyInt())).thenReturn(Optional.of(new Category()));
		when(mockMapper.map(any(TransactionDTO.class))).thenReturn(new Transaction());
		when(mockTransactionRepository.saveAll(any())).thenReturn(transactions);
		when(mockMapper.map(any(Transaction.class))).thenReturn(new TransactionDTO(1));
		
		// Act
		List<TransactionDTO> savedTransactionDTOs = transactionService.saveTransactions(transactionDTOs, new User());
		
		// Assert
		assertEquals(savedTransactionDTOs.size(), transactions.size());
		for (TransactionDTO savedTransactionDTO : savedTransactionDTOs) {
			assertNotEquals(0, savedTransactionDTO.getId());
		}
	}
	
	@Test
	public void saveTransactions_categoryNotFound_failure() {
		// Arrange
		CategoryDTO categoryDTO = mock(CategoryDTO.class);
		when(categoryDTO.getId()).thenReturn(1);
		
		TransactionDTO transactionDTO = mock(TransactionDTO.class);
		when(transactionDTO.getCategory()).thenReturn(categoryDTO);
		
		List<TransactionDTO> transactionDTOs = List.of(transactionDTO);
		when(mockCategoryRepository.findById(anyInt())).thenReturn(Optional.empty());
		
		Optional<Category> optionalCategory = mock(Optional.class);
		when(optionalCategory.isEmpty()).thenReturn(true);
		when(mockCategoryRepository.findById(anyInt())).thenReturn(optionalCategory);
		
		// Act and Assert
		assertThrows(CategoryNotFoundException.class, () -> transactionService.saveTransactions(transactionDTOs, new User()));
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
	
	@Test
	public void deleteTransaction_transactionFound_success() throws TransactionNotFoundException {
		// Arrange
		Optional<Transaction> optionalTransaction = mock(Optional.class);
		when(optionalTransaction.isEmpty()).thenReturn(false);
		when(mockTransactionRepository.findById(anyInt())).thenReturn(optionalTransaction);
		
		// Act
		transactionService.deleteTransaction(1);
		
		// Assert
		verify(mockTransactionRepository, times(1)).deleteById(anyInt());
	}
	
	@Test
	public void deleteTransaction_transactionNotFound_failure() {
		// Arrange
		Optional<Transaction> optionalTransaction = mock(Optional.class);
		when(optionalTransaction.isEmpty()).thenReturn(true);
		when(mockTransactionRepository.findById(anyInt())).thenReturn(optionalTransaction);
	
		// Act and Assert
		assertThrows(TransactionNotFoundException.class, () -> transactionService.deleteTransaction(1));
	}
	
	@Test
	public void updateTransaction_transactionFound_success() throws TransactionNotFoundException, InvalidTransactionIdentifierException, CategoryNotFoundException {
		// Arrange
		Transaction transaction = mock(Transaction.class);
		when(transaction.getId()).thenReturn(1);
		when(transaction.getIdentifier()).thenReturn("guid");
		when(transaction.getCategory()).thenReturn(mock(Category.class));
		when(mockMapper.map(any(TransactionDTO.class))).thenReturn(transaction);
		
		Optional<Transaction> optionalTransaction = mock(Optional.class);
		when(optionalTransaction.isEmpty()).thenReturn(false);
		when(optionalTransaction.get()).thenReturn(transaction);
		when(mockTransactionRepository.findById(anyInt())).thenReturn(optionalTransaction);
		
		Optional<Category> optionalCategory = mock(Optional.class);
		when(optionalCategory.isEmpty()).thenReturn(false);
		when(optionalCategory.get()).thenReturn(new Category());
		when(mockCategoryRepository.findById(anyInt())).thenReturn(optionalCategory);
		
		CategoryDTO categoryDTO = mock(CategoryDTO.class);
		when(categoryDTO.getId()).thenReturn(1);
		TransactionDTO transactionDTO = mock(TransactionDTO.class);
		when(transactionDTO.getCategory()).thenReturn(categoryDTO);
		
		// Act
		transactionService.updateTransaction(transactionDTO);
		
		// Assert
		verify(mockTransactionRepository, times(1)).save(any(Transaction.class));
	}
	
	@Test
	public void updateTransaction_transactionNotFound_failure() {
		// Arrange
		Optional<Transaction> optionalTransaction = mock(Optional.class);
		when(optionalTransaction.isEmpty()).thenReturn(true);
		when(mockMapper.map(any(TransactionDTO.class))).thenReturn(new Transaction(1));
		
		// Act and Assert
		assertThrows(TransactionNotFoundException.class, () -> transactionService.updateTransaction(mock(TransactionDTO.class)));
	}
	
	@Test
	public void updateTransaction_invalidTransactionIdentifier_failure() throws TransactionNotFoundException, InvalidTransactionIdentifierException {
		// Arrange
		Transaction transaction = mock(Transaction.class);
		when(transaction.getId()).thenReturn(1);
		when(transaction.getIdentifier()).thenReturn("guid");
		
		Transaction updatedTransaction = mock(Transaction.class);
		when(updatedTransaction.getIdentifier()).thenReturn("other");
		when(mockMapper.map(any(TransactionDTO.class))).thenReturn(updatedTransaction);
		
		Optional<Transaction> optionalTransaction = mock(Optional.class);
		when(optionalTransaction.isEmpty()).thenReturn(false);
		when(optionalTransaction.get()).thenReturn(transaction);
		when(mockTransactionRepository.findById(anyInt())).thenReturn(optionalTransaction);
		
		// Act
		assertThrows(InvalidTransactionIdentifierException.class, () -> transactionService.updateTransaction(mock(TransactionDTO.class)));
	}
}
