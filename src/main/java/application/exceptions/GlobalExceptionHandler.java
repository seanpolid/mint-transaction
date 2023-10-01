package application.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	private Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
	
	@ExceptionHandler(CategoryNotFoundException.class)
	public ResponseEntity<String> categoryNotFoundExceptionHandler(Exception ex) {
		logger.error(generateErrorMessage(ex), ex);
		return new ResponseEntity<String>("Please provide a valid category.", HttpStatus.BAD_REQUEST);
	}
	
	private String generateErrorMessage(Exception ex) {
		return String.format("An exception occurred in %s", ex.getStackTrace()[0].getClassName());
	}
	
	@ExceptionHandler(TransactionNotFoundException.class)
	public ResponseEntity<String> transactionNotFoundExceptionHandler(Exception ex) {
		logger.error(generateErrorMessage(ex), ex);
		return new ResponseEntity<String>("The provided transaction was not found.", HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(InvalidTransactionIdentifierException.class)
	public ResponseEntity<String> invalidTransactionIdentifierExceptionHandler(Exception ex) {
		logger.error(generateErrorMessage(ex), ex);
		return new ResponseEntity<String>("Please provide a valid transaction.", HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler({ RuntimeException.class, Exception.class })
	public ResponseEntity<String> generalExceptionHandler(Exception ex) {
		logger.error("An exception occurred in " + ex.getStackTrace()[0].getClassName(), ex);
		return new ResponseEntity<String>("An unknown error occurred. Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}
