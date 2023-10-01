package application.exceptions;

import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Profile("test")
@RestController
@RequestMapping("exceptions")
public class ExceptionTestController {

	@GetMapping("runtime")
	public void throwsRuntimeException() {
		throw new RuntimeException();
	}
	
	@GetMapping("checked") 
	public void throwsCheckedException() throws Exception {
		throw new Exception();
	}
	
	@GetMapping("category")
	public void throwsCategoryNotFoundException_categoryNull() throws CategoryNotFoundException {
		throw new CategoryNotFoundException();
	}
	
	@GetMapping("transaction-not-found")
	public void throwsTransactionNotFoundException() throws TransactionNotFoundException {
		throw new TransactionNotFoundException(1);
	}
	
	@GetMapping("invalid-transaction-identifier")
	public void throwsInvalidTransactionIdentifierException() throws InvalidTransactionIdentifierException {
		throw new InvalidTransactionIdentifierException("original identifier", "provided identifier");
	}
	
}
