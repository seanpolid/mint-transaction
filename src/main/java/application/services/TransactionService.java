package application.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import application.dtos.TransactionDTO;
import application.entities.Category;
import application.entities.Transaction;
import application.entities.User;
import application.exceptions.CategoryNotFoundException;
import application.repositories.ICategoryRepository;
import application.repositories.ITransactionRepository;
import application.services.interfaces.ITransactionService;
import application.utilities.IMapper;

@Service
public class TransactionService implements ITransactionService {

	private final ITransactionRepository transactionRepository;
	private final ICategoryRepository categoryRepository;
	private final IMapper mapper;
	
	public TransactionService(ITransactionRepository transactionRepository, 
							  ICategoryRepository categoryRepository,
							  IMapper mapper) {
		this.transactionRepository = transactionRepository;
		this.categoryRepository = categoryRepository;
		this.mapper = mapper;
	}

	@Override
	@Transactional
	public List<TransactionDTO> saveTransactions(List<TransactionDTO> transactionDTOs, User user) throws CategoryNotFoundException {
		List<Transaction> transactions = new ArrayList<>();
		for (TransactionDTO transactionDTO : transactionDTOs) {
			Transaction transaction = mapToTransaction(transactionDTO, user);
			transactions.add(transaction);
		}
		
		List<Transaction> savedTransactions = transactionRepository.saveAll(transactions);
		
		return mapAllToTransactionDTO(savedTransactions);
	}
	
	private Transaction mapToTransaction(TransactionDTO transactionDTO, User user) throws CategoryNotFoundException {
		Optional<Category> optionalCategory = categoryRepository.findById(transactionDTO.getCategory());
		
		if (optionalCategory.isEmpty()) {
			throw new CategoryNotFoundException(transactionDTO.getCategory());
		}
		Category category = optionalCategory.get();
		
		// Initialize collections
		category.getTransactions();
		user.getTransactions();		
		
		Transaction transaction = mapper.map(transactionDTO);
		transaction.setCategory(category);
		transaction.setUser(user);
		
		return transaction;
	}
	
	private List<TransactionDTO> mapAllToTransactionDTO(List<Transaction> transactions) {
		return transactions.stream()
				.map(transaction -> mapper.map(transaction))
				.toList();
	}

	@Override
	public List<TransactionDTO> getTransactions(int userId) {
		List<Transaction> transactions = transactionRepository.findAllByUserId(userId);
		
		return mapAllToTransactionDTO(transactions);
	}
	
}
