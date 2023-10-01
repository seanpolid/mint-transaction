package application.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
	
	@PostMapping
	public ResponseEntity<Object> saveTransactions(@RequestBody @Valid List<TransactionDTO> transactionDTOs,
												   @AuthenticationPrincipal User user) throws CategoryNotFoundException {
		user = new User(1, "testUser");
		logger.info("Saving transactions for user: " + user.getId());
		transactionDTOs = transactionService.saveTransactions(transactionDTOs, user);
		logger.info("Transactions successfully saved for user: " + user.getId() + ". Sending them back to client.");

		return new ResponseEntity<Object>(transactionDTOs, HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<Object> getTransactions(@AuthenticationPrincipal User user) {
		user = new User(1, "testUser");
		logger.info("Retrieving transactions for user: " + user.getId());
		List<TransactionDTO> transactions = transactionService.getTransactions(user.getId());
		logger.info("Successfully retrieved transactions for user: " + user.getId());
		
		return new ResponseEntity<Object>(transactions, HttpStatus.OK);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<Object> deleteTransaction(@PathVariable int id,
													@AuthenticationPrincipal User user) throws TransactionNotFoundException {
		user = new User(1, "testUser");
		logger.info("Deleting transaction %d for user: %d", id, user.getId());
		transactionService.deleteTransaction(id);
		logger.info("Successfully deleted transanction %d for user: %d", id, user.getId());
		
		return new ResponseEntity<Object>(HttpStatus.NO_CONTENT);
	}
	
	@PutMapping
	public ResponseEntity<Object> updateTransaction(@RequestBody @Valid TransactionDTO transactionDTO,
													@AuthenticationPrincipal User user) throws TransactionNotFoundException, 
																							   InvalidTransactionIdentifierException, 
																							   CategoryNotFoundException {
		user = new User(1, "testUser");
		logger.info("Updating transaction %d for user: %d", transactionDTO.getId(), user.getId());
		transactionService.updateTransaction(transactionDTO);
		logger.info("Successfully updated transaction %d for user: %d", transactionDTO.getId(), user.getId());
		
		return new ResponseEntity<Object>(HttpStatus.NO_CONTENT);
	}
}
