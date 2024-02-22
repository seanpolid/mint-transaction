package application.integration_tests.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import application.dtos.CategoryDTO;
import application.dtos.TransactionDTO;
import application.entities.Category;
import application.entities.Transaction;
import application.entities.Type;
import application.entities.User;
import application.exceptions.CategoryNotFoundException;
import application.exceptions.InvalidTransactionIdentifierException;
import application.exceptions.TransactionNotFoundException;
import application.repositories.ICategoryRepository;
import application.repositories.ITransactionRepository;
import application.repositories.ITypeRepository;
import application.repositories.IUserRepository;
import application.services.TransactionService;
import application.utilities.IMapper;
import application.utilities.Mapper;

@SpringBootTest
@ActiveProfiles("test")
public class TransactionServiceTests {

	@Autowired
	private TransactionService transactionService;
	
	@Autowired
	private ITransactionRepository transactionRepository;
	
	@Autowired
	private IUserRepository userRepository;
	
	@Autowired
	private ITypeRepository typeRepository;
	
	@Autowired
	private ICategoryRepository categoryRepository;
	
	@Autowired
	private  IMapper mapper;
	
	private User user;
	private Category category;
	private Category category2;
	private CategoryDTO categoryDTO;
	private CategoryDTO categoryDTO2;
	private LocalDate date = LocalDate.now();
	private String uuid1 = java.util.UUID.randomUUID().toString();
	private String uuid2 = java.util.UUID.randomUUID().toString();
	private BigDecimal bigDecimal = new BigDecimal("100.00");
	
	@BeforeEach
	public void setup() {
		User user = new User(0, "email", "username", "password", date, Long.valueOf(123456789));
		this.user = userRepository.save(user);
		
		Type type = new Type(0, "name");
		type = typeRepository.save(type);
		
		category = new Category(0, "name", type);
		category2 = new Category(0, "name2", type);
		
		category = categoryRepository.save(category);
		category2 = categoryRepository.save(category2);

		categoryDTO = new Mapper().map(category);
		categoryDTO2 = new Mapper().map(category2);
		
		transactionRepository.deleteAll();
	}
	
	@AfterEach
	public void destroy() {
		transactionRepository.deleteAll();
		userRepository.deleteAll();
		categoryRepository.deleteAll();
		typeRepository.deleteAll();
	}
	
	@Test
	public void saveTransactions_twoNewTransactions_success() throws Exception {
		// Arrange
		List<TransactionDTO> transactionDTOs = List.of(
				new TransactionDTO(0, uuid1, bigDecimal, date, date, "notes", categoryDTO),
				new TransactionDTO(0, uuid2, bigDecimal, date, date, "notes", categoryDTO)
		);
		
		// Act
		List<TransactionDTO> savedTransactionDTOs = transactionService.saveTransactions(transactionDTOs, user.getId());
		
		// Assert
		assertEquals(savedTransactionDTOs.size(), transactionDTOs.size());
		for (TransactionDTO savedTransactionDTO : savedTransactionDTOs) {
			Optional<Transaction> transaction = transactionRepository.findByIdentifier(savedTransactionDTO.getIdentifier());
			assertTrue(transaction.isPresent());
		}	
	}
	
	@Test
	public void getTransactions_twoTransactionsSaved_success() {
		// Arrange
		List<Transaction> transactions = List.of(
				new Transaction(0, uuid1, bigDecimal, date, date, "notes", category, user),
				new Transaction(0, uuid2, bigDecimal, date, date, "notes", category, user)
		);
		transactions = transactionRepository.saveAll(transactions);
		Map<Integer, Transaction> transactionMap = transactions.stream().collect(Collectors.toMap(Transaction::getId, t -> t));
	
		// Act
		List<TransactionDTO> transactionDTOs = transactionService.getTransactions(user.getId());
		
		// Assert
		for (TransactionDTO transactionDTO : transactionDTOs) {
			Transaction transaction = transactionMap.get(transactionDTO.getId());
			TransactionDTO expectedTransactionDTO = mapper.map(transaction);
			assertTrue(expectedTransactionDTO.equals(transactionDTO));
		}
	}
	
	@Test
	public void getTransactions_zeroTransactionsSaved_success() {
		// Act
		List<TransactionDTO> transactionDTOs = transactionService.getTransactions(user.getId());
		
		// Assert
		assertTrue(transactionDTOs.size() == 0);
	}
	
	@Test
	public void deleteTransaction_sucess() {
		// Arrange
		Transaction transaction = new Transaction(0, "guid", bigDecimal, date, date, "notes", category, user);
		transactionRepository.save(transaction);
		
		// Act
		transactionRepository.deleteById(transaction.getId());
		Optional<Transaction> optionalTransaction = transactionRepository.findById(transaction.getId());
		
		// Assert
		assertTrue(transaction.getId() > 0);
		assertTrue(optionalTransaction.isEmpty());
	}
	
	@Test
	public void updateTransaction_success() throws TransactionNotFoundException, InvalidTransactionIdentifierException, CategoryNotFoundException {
		// Arrange
		Transaction transaction = new Transaction(0, "guid", bigDecimal, date, null, "notes", category, user);
		transactionRepository.save(transaction);
		
		Optional<Transaction> optionalTransaction = transactionRepository.findById(transaction.getId());
		transaction = optionalTransaction.get();
		
		BigDecimal newAmount = new BigDecimal("1000.00");
		TransactionDTO transactionDTO = new TransactionDTO(transaction.getId(), transaction.getIdentifier(), 
				newAmount, LocalDate.now(), LocalDate.now(), "new notes", categoryDTO2);
		
		// Act
		transactionService.updateTransaction(transactionDTO);
		optionalTransaction = transactionRepository.findById(transaction.getId());
		Transaction updatedTransaction = optionalTransaction.get();
		
		// Assert 
		assertEquals(updatedTransaction.getAmount(), transactionDTO.getAmount());
		assertEquals(updatedTransaction.getStartDate(), transactionDTO.getStartDate());
		assertEquals(updatedTransaction.getEndDate(), transactionDTO.getEndDate());
		assertEquals(updatedTransaction.getNotes(), transactionDTO.getNotes());
		assertEquals(mapper.map(updatedTransaction.getCategory()), transactionDTO.getCategory());
	}
	
}
