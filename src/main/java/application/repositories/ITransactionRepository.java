package application.repositories;

import org.springframework.data.repository.ListCrudRepository;

import application.entities.Transaction;

public interface ITransactionRepository extends ListCrudRepository<Transaction, Integer> {

}
