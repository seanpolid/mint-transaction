package application.services.interfaces;

import java.util.List;

import application.dtos.TransactionDTO;
import application.entities.User;
import application.exceptions.CategoryNotFoundException;
import application.exceptions.InvalidTransactionIdentifierException;
import application.exceptions.TransactionNotFoundException;

public interface ITransactionService {

	public List<TransactionDTO> saveTransactions(List<TransactionDTO> transactionDTOs, int i) throws CategoryNotFoundException;
	public List<TransactionDTO> getTransactions(int userId);
	public void deleteTransaction(int id) throws TransactionNotFoundException;
	public void updateTransaction(TransactionDTO transactionDTO) throws TransactionNotFoundException, InvalidTransactionIdentifierException, CategoryNotFoundException;
	
}
