package application.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import application.dtos.TransactionDTO;
import application.services.interfaces.ITransactionService;

@RestController
@RequestMapping(path="api/{userId}/transactions")
@CrossOrigin(origins={"http://localhost:5173/"})
public class TransactionController {

	private final ITransactionService transactionService;
	private final Logger logger = LoggerFactory.getLogger(TransactionController.class);
	
	public TransactionController(ITransactionService transactionService) {
		this.transactionService = transactionService;
	}
	
	@PostMapping()
	public ResponseEntity<Object> saveTransactions(@PathVariable int userId, @RequestBody List<TransactionDTO> transactionDTOs) {
		logger.info("Saving transactions for user: " + userId);
		
		try {
			transactionService.saveTransactions(transactionDTOs);
			logger.info("Transactions successfully saved for user: " + userId);
			return new ResponseEntity<Object>("Transactions saved successfully.", HttpStatus.CREATED);
		} catch (Exception ex) {
			logger.error("An exception occurred while retrieving transactions: " + ex);
			return new ResponseEntity<Object>("Could not save transactions.", HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping
	public ResponseEntity<Object> getTransactions(@PathVariable int userId) {
		logger.info("Retrieving transactions for user: " + userId);
		
		try {
			List<TransactionDTO> transactions = transactionService.getTransactions(userId);
			logger.info("Transactions successfully retrieved for user: " + userId);
			return new ResponseEntity<Object>(transactions, HttpStatus.OK);
		} catch (Exception ex) {
			logger.error("An exception occurred while retrieving transactions for user " + userId + ": " + ex);
			return new ResponseEntity<Object>("Could not retrieve transactions for user: " + userId, HttpStatus.BAD_REQUEST);
		}
	}
}
