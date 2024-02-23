package application.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import application.dtos.TransactionDTO;
import application.entities.User;
import application.exceptions.CategoryNotFoundException;
import application.exceptions.InvalidTransactionIdentifierException;
import application.exceptions.TransactionNotFoundException;
import application.services.interfaces.ITransactionService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("api/transactions")
@CrossOrigin(origins={"http://localhost:5173/"})
public class TransactionController {

	private final ITransactionService transactionService;
	private final Logger logger = LoggerFactory.getLogger(TransactionController.class);
	
	public TransactionController(ITransactionService transactionService) {
		this.transactionService = transactionService;
	}
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> saveTransactions(@RequestBody @Valid List<TransactionDTO> transactionDTOs, Authentication authentication) throws CategoryNotFoundException {
		User user = (User) authentication.getPrincipal();
		
		logger.info("Saving transactions for user: " + user.getId());
		transactionDTOs = transactionService.saveTransactions(transactionDTOs, user.getId());
		logger.info("Transactions successfully saved for user: " + user.getId() + ". Sending them back to client.");

		return new ResponseEntity<Object>(transactionDTOs, HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<Object> getTransactions(Authentication authentication) {
		User user = (User) authentication.getPrincipal();
		
		logger.info("Retrieving transactions for user: " + user.getId());
		List<TransactionDTO> transactions = transactionService.getTransactions(user.getId());
		logger.info("Successfully retrieved transactions for user: " + user.getId());
		
		return new ResponseEntity<Object>(transactions, HttpStatus.OK);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<Object> deleteTransaction(@PathVariable int id, Authentication authentication) throws TransactionNotFoundException {
		User user = (User) authentication.getPrincipal();
		
		logger.info("Deleting transaction %d for user: %d", id, user.getId());
		transactionService.deleteTransaction(id);
		logger.info("Successfully deleted transanction %d for user: %d", id, user.getId());
		
		return new ResponseEntity<Object>(HttpStatus.NO_CONTENT);
	}
	
	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> updateTransaction(@RequestBody @Valid TransactionDTO transactionDTO, Authentication authentication) throws TransactionNotFoundException, 
																							   												 InvalidTransactionIdentifierException, 
																							   												 CategoryNotFoundException {
		User user = (User) authentication.getPrincipal();
		
		logger.info("Updating transaction %d for user: %d", transactionDTO.getId(), user.getId());
		transactionService.updateTransaction(transactionDTO);
		logger.info("Successfully updated transaction %d for user: %d", transactionDTO.getId(), user.getId());
		
		return new ResponseEntity<Object>(HttpStatus.NO_CONTENT);
	}
}
