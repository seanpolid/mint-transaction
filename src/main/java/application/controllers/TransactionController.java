package application.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import application.entities.Transaction;
import application.repositories.ITransactionRepository;

@RestController
@RequestMapping("api/transactions")
public class TransactionController {

	private final ITransactionRepository transactionRepository;
	
	public TransactionController(ITransactionRepository transactionRepository) {
		this.transactionRepository = transactionRepository;
	}
	
	@PostMapping
	public ResponseEntity saveTransactions(@RequestParam String userId, @RequestBody List<Transaction> transactions) {
		ResponseEntity response = null;
		
		try {
			transactionRepository.saveAll(transactions);
			return new ResponseEntity("Transactions saved successfully.", HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity("Could not save transactions.", HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping
	public ResponseEntity getTransactions(@RequestParam int userId) {
		ResponseEntity response = null;
		
		try {
			List<Transaction> transactions = transactionRepository.findAllByUserId(userId);
			return new ResponseEntity(transactions, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity("Could not retrieve transactions for user: " + userId, HttpStatus.BAD_REQUEST);
		}
	}
}
