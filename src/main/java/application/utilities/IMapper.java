package application.utilities;

import application.dtos.CategoryDTO;
import application.dtos.TransactionDTO;
import application.dtos.TypeDTO;
import application.entities.Category;
import application.entities.Transaction;
import application.entities.Type;

public interface IMapper {
	
	Transaction map(TransactionDTO transactionDTO);
	TransactionDTO map(Transaction transaction);
	
	TypeDTO map(Type type);
	
	CategoryDTO map(Category category);
	
}
