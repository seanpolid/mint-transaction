package application.controllers;

import java.util.List;

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
import application.services.ITransactionService;

@RestController
@RequestMapping(path="api/{userId}/transactions")
@CrossOrigin(origins={"http://localhost:5173/"})
public class TransactionController {

	private final ITransactionService transactionService;
	
	public TransactionController(ITransactionService transactionService) {
		this.transactionService = transactionService;
	}
	
	@PostMapping()
	public ResponseEntity saveTransactions(@PathVariable int userId, @RequestBody List<TransactionDTO> transactionDTOs) {
		ResponseEntity response = null;
		System.out.println(transactionDTOs);
		try {
			transactionService.saveTransactions(transactionDTOs);
			return new ResponseEntity("Transactions saved successfully.", HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity("Could not save transactions.", HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping
	public ResponseEntity getTransactions(@PathVariable int userId) {
		ResponseEntity response = null;
		
		try {
			List<TransactionDTO> transactions = transactionService.getTransactions(userId);
			return new ResponseEntity(transactions, HttpStatus.OK);
		} catch (Exception ex) {
			return new ResponseEntity("Could not retrieve transactions for user: " + userId, HttpStatus.BAD_REQUEST);
		}
	}
}
