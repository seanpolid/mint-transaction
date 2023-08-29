package application.controllers;

import org.springframework.web.bind.annotation.RestController;

import application.repositories.ITransactionRepository;

@RestController
public class TransactionController {

	private final ITransactionRepository transactionRepository;
	
	public TransactionController(ITransactionRepository transactionRepository) {
		this.transactionRepository = transactionRepository;
	}
}
