package application.services.interfaces;

import java.util.List;

import application.dtos.TransactionDTO;
import application.entities.User;
import application.exceptions.CategoryNotFoundException;

public interface ITransactionService {

	public List<TransactionDTO> saveTransactions(List<TransactionDTO> transactionDTOs, User user) throws CategoryNotFoundException;
	public List<TransactionDTO> getTransactions(int userId);
	
}
