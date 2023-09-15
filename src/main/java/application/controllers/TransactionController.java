package application.controllers;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import application.dtos.TransactionDTO;
import application.entities.User;
import application.exceptions.CategoryNotFoundException;
import application.services.interfaces.ITransactionService;

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
	public ResponseEntity<Object> saveTransactions(@RequestBody List<TransactionDTO> transactionDTOs,
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
		logger.info("Transactions successfully retrieved for user: " + user.getId());
		
		return new ResponseEntity<Object>(transactions, HttpStatus.OK);
	}
}
