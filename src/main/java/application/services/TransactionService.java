package application.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import application.dtos.TransactionDTO;
import application.entities.Category;
import application.entities.Transaction;
import application.exceptions.CategoryNotFoundException;
import application.repositories.ICategoryRepository;
import application.repositories.ITransactionRepository;
import application.services.interfaces.ITransactionService;
import application.utilities.IMapper;
import application.utilities.Mapper;

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
	public void saveTransactions(List<TransactionDTO> transactionDTOs) throws Exception {
		List<Transaction> transactions = new ArrayList<>();
		
		for (TransactionDTO transactionDTO : transactionDTOs) {
			Category category = categoryRepository.findByNameIgnoreCase(transactionDTO.getCategory());
			if (category == null) {
				throw new CategoryNotFoundException(transactionDTO.getCategory());
			}
			
			Transaction transaction = mapper.map(transactionDTO);
			transaction.setCategory(category);
			transactions.add(transaction);
		}
		
		transactionRepository.saveAll(transactions);
	}

	@Override
	public List<TransactionDTO> getTransactions(int userId) {
		List<TransactionDTO> transactionDTOs = new ArrayList<>();
		
		List<Transaction> transactions = transactionRepository.findAllByUserId(userId);
		for (Transaction transaction : transactions) {
			TransactionDTO transactionDTO = mapper.map(transaction);
		}
		
		return transactionDTOs;
	}
	
}
