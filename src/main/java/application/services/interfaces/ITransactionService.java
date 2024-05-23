package application.services.interfaces;

import java.util.List;

import application.dtos.TransactionDTO;
import application.exceptions.CategoryNotFoundException;
import application.exceptions.TransactionNotFoundException;
import application.exceptions.TypeNotFoundException;

public interface ITransactionService {

	public List<TransactionDTO> saveTransactions(List<TransactionDTO> transactionDTOs, int i) throws CategoryNotFoundException, TypeNotFoundException;
	public List<TransactionDTO> getTransactions(int userId);
	public void deleteTransaction(int id) throws TransactionNotFoundException;
	public void updateTransaction(TransactionDTO transactionDTO) throws Exception;
	
}
