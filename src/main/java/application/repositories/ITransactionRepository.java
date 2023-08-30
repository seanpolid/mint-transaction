package application.repositories;

import java.util.List;

import org.springframework.data.repository.ListCrudRepository;

import application.entities.Transaction;

public interface ITransactionRepository extends ListCrudRepository<Transaction, Integer> {

	public List<Transaction> findAllByUserId(int userId);
	
}
