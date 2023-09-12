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

import application.dtos.TransactionDTO;
import application.entities.Category;
import application.entities.Transaction;
import application.entities.Type;
import application.entities.User;
import application.repositories.ICategoryRepository;
import application.repositories.ITransactionRepository;
import application.repositories.ITypeRepository;
import application.repositories.IUserRepository;
import application.services.TransactionService;
import application.utilities.IMapper;

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
	private LocalDate date = LocalDate.now();
	private String uuid1 = java.util.UUID.randomUUID().toString();
	private String uuid2 = java.util.UUID.randomUUID().toString();
	private BigDecimal bigDecimal = new BigDecimal("100.00");
	
	@BeforeEach
	public void setup() {
		User user = new User(0, "email", "username", "firstName", "password", date, Long.valueOf(123456789));
		this.user = userRepository.save(user);
		
		Type type = new Type(0, "name");
		type = typeRepository.save(type);
		
		Category category = new Category(0, "name", type);
		this.category = categoryRepository.save(category);
		this.category.getTransactions();
		
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
				new TransactionDTO(0, uuid1, bigDecimal, date, date, "notes", category.getId()),
				new TransactionDTO(0, uuid2, bigDecimal, date, date, "notes", category.getId())
		);
		
		// Act
		List<TransactionDTO> savedTransactionDTOs = transactionService.saveTransactions(transactionDTOs, user);
		
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
}
