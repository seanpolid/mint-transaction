package application.services.interfaces;

import java.util.List;

import application.dtos.TransactionDTO;

public interface ITransactionService {

	public void saveTransactions(List<TransactionDTO> transactionDTOs) throws Exception;
	public List<TransactionDTO> getTransactions(int userId) throws Exception;
	
}
