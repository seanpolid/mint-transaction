package application.services.interfaces;

import java.util.List;

import application.dtos.TransactionDTO;
import application.entities.User;

public interface ITransactionService {

	public List<TransactionDTO> saveTransactions(List<TransactionDTO> transactionDTOs, User user) throws Exception;
	public List<TransactionDTO> getTransactions(int userId) throws Exception;
	
}
