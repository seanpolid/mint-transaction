package application.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import application.dtos.CategoryDTO;
import application.dtos.TransactionDTO;
import application.entities.Category;
import application.entities.Transaction;
import application.entities.Type;
import application.entities.User;
import application.exceptions.CategoryNotFoundException;
import application.exceptions.InvalidTransactionIdentifierException;
import application.exceptions.TransactionNotFoundException;
import application.exceptions.TypeNotFoundException;
import application.repositories.ICategoryRepository;
import application.repositories.ITransactionRepository;
import application.repositories.ITypeRepository;
import application.repositories.IUserRepository;
import application.services.interfaces.ITransactionService;
import application.utilities.IMapper;

@Service
public class TransactionService implements ITransactionService {

	private final ITransactionRepository transactionRepository;
	private final ICategoryRepository categoryRepository;
	private final IUserRepository userRepository;
	private final IMapper mapper;
	private final ITypeRepository typeRepository;
	
	public TransactionService(ITransactionRepository transactionRepository, 
							  ICategoryRepository categoryRepository,
							  IUserRepository userRepository,
							  IMapper mapper,
							  ITypeRepository typeRepository) {
		this.transactionRepository = transactionRepository;
		this.categoryRepository = categoryRepository;
		this.userRepository = userRepository;
		this.mapper = mapper;
		this.typeRepository = typeRepository;
	}

	@Override
	@Transactional
	public List<TransactionDTO> saveTransactions(List<TransactionDTO> transactionDTOs, int userId) throws CategoryNotFoundException, TypeNotFoundException {
		List<Transaction> transactions = new ArrayList<>();
		for (TransactionDTO transactionDTO : transactionDTOs) {
			Transaction transaction = mapToTransaction(transactionDTO, userId);
			transactions.add(transaction);
		}
		
		List<Transaction> savedTransactions = transactionRepository.saveAll(transactions);
		
		return mapAllToTransactionDTO(savedTransactions);
	}

	private Transaction mapToTransaction(TransactionDTO transactionDTO, int userId) throws CategoryNotFoundException, TypeNotFoundException {
		Category category = retrieveCategory(transactionDTO.getCategory());
		
		// Initialize collection
		User user = userRepository.findById(userId).get();
		user.getTransactions().size();		
		
		Transaction transaction = mapper.map(transactionDTO);
		transaction.setCategory(category);
		transaction.setUser(user);
		
		return transaction;
	}
	
	private Category retrieveCategory(CategoryDTO categoryDTO) throws CategoryNotFoundException, TypeNotFoundException {
		if (categoryDTO.getId() == 0) {
			Optional<Type> optionalType = typeRepository.findById(categoryDTO.getType().getId());
			if (!optionalType.isPresent()) {
				throw new TypeNotFoundException();
			}
			
			return new Category(categoryDTO.getName(), optionalType.get());
		}
		
		int categoryId = categoryDTO.getId();
		Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
		if (optionalCategory.isEmpty()) {
			throw new CategoryNotFoundException(categoryId);
		}
		Category category = optionalCategory.get();
		
		// Initialize collection
		category.getTransactions();
		
		return category;
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

	@Override
	public void deleteTransaction(int id) throws TransactionNotFoundException {
		Optional<Transaction> optionalTransaction = transactionRepository.findById(id);
		if (optionalTransaction.isEmpty()) {
			throw new TransactionNotFoundException(id);
		}
		
		transactionRepository.deleteById(id);
	}

	@Override
	@Transactional
	public void updateTransaction(TransactionDTO transactionDTO) throws Exception {
		Transaction updatedTransaction = mapper.map(transactionDTO);
		
		Optional<Transaction> optionalTransaction = transactionRepository.findById(updatedTransaction.getId());
		if (optionalTransaction.isEmpty()) {
			throw new TransactionNotFoundException(updatedTransaction.getId());
		}
		
		Transaction transactionToUpdate = optionalTransaction.get();
		if (!transactionToUpdate.getIdentifier().equals(updatedTransaction.getIdentifier())) {
			throw new InvalidTransactionIdentifierException(transactionToUpdate.getIdentifier(), updatedTransaction.getIdentifier());
		}
		
		Category category = retrieveCategory(transactionDTO.getCategory());
		overwrite(transactionToUpdate, updatedTransaction, category);
		
		transactionRepository.save(transactionToUpdate);
	}

	private void overwrite(Transaction transactionToUpdate, Transaction updatedTransaction, Category category) {
		transactionToUpdate.setAmount(updatedTransaction.getAmount());
		transactionToUpdate.setStartDate(updatedTransaction.getStartDate());
		transactionToUpdate.setEndDate(updatedTransaction.getEndDate());
		transactionToUpdate.setNotes(updatedTransaction.getNotes());
		transactionToUpdate.setCategory(category);
	}
	
}
