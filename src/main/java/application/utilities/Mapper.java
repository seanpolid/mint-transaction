package application.utilities;

import org.springframework.stereotype.Component;

import application.dtos.CategoryDTO;
import application.dtos.TransactionDTO;
import application.dtos.TypeDTO;
import application.entities.Category;
import application.entities.Transaction;
import application.entities.Type;

@Component
public class Mapper implements IMapper {

	public Transaction map(TransactionDTO transactionDTO) {
		return new Transaction(
				transactionDTO.getId(),
				transactionDTO.getIdentifier(),
				transactionDTO.getAmount(),
				transactionDTO.getStartDate(),
				transactionDTO.getEndDate(),
				transactionDTO.getNotes());
	}
	
	public TransactionDTO map(Transaction transaction) {
		CategoryDTO category = map(transaction.getCategory());
		return new TransactionDTO(
				transaction.getId(),
				transaction.getIdentifier(),
				transaction.getAmount(),
				transaction.getStartDate(),
				transaction.getEndDate(),
				transaction.getNotes(),
				category);
	}
	
	public TypeDTO map(Type type) {
		return new TypeDTO(type.getId(), type.getName());
	}
	
	public CategoryDTO map(Category category) {
		TypeDTO type = map(category.getType());
		return new CategoryDTO(category.getId(), category.getName(), type);
	}
	
}
