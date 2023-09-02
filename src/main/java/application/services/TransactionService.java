package application.services;

import java.util.List;

import org.springframework.stereotype.Service;

import application.dtos.TransactionDTO;
import application.repositories.ITransactionRepository;

@Service
public class TransactionService implements ITransactionService {

	private final ITransactionRepository transactionRepository;
	
	public TransactionService(ITransactionRepository transactionRepository) {
		this.transactionRepository = transactionRepository;
	}

	@Override
	public void saveTransactions(List<TransactionDTO> transactionDTOs) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<TransactionDTO> getTransactions(int userId) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	
}
