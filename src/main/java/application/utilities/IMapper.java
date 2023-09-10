package application.utilities;

import application.dtos.CategoryDTO;
import application.dtos.TransactionDTO;
import application.dtos.TypeDTO;
import application.entities.Category;
import application.entities.Transaction;
import application.entities.Type;

public interface IMapper {
	
	public Transaction map(TransactionDTO transactionDTO);
	public TransactionDTO map(Transaction transaction);
	public TypeDTO map(Type type);
	public CategoryDTO map(Category category);

}
