package application.exceptions;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import application.dtos.ErrorMessageDTO;

@RestControllerAdvice
public class GlobalExceptionHandler {

	private Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
	private HttpHeaders jsonHeaders = new HttpHeaders() {{ put(HttpHeaders.CONTENT_TYPE, List.of("application/json")); }};
	
	@ExceptionHandler(CategoryNotFoundException.class)
	public ResponseEntity<ErrorMessageDTO> categoryNotFoundExceptionHandler(Exception ex) {
		logger.error(generateErrorMessage(ex), ex);
		
		String message = "Please provide a valid category.";
		return new ResponseEntity<>(new ErrorMessageDTO(message), jsonHeaders, HttpStatus.BAD_REQUEST);
	}
	
	private String generateErrorMessage(Exception ex) {
		return String.format("An exception occurred in %s", ex.getStackTrace()[0].getClassName());
	}
	
	@ExceptionHandler(TransactionNotFoundException.class)
	public ResponseEntity<ErrorMessageDTO> transactionNotFoundExceptionHandler(Exception ex) {
		logger.error(generateErrorMessage(ex), ex);
		
		String message = "The provided transaction was not found.";
		return new ResponseEntity<>(new ErrorMessageDTO(message), jsonHeaders, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(InvalidTransactionIdentifierException.class)
	public ResponseEntity<ErrorMessageDTO> invalidTransactionIdentifierExceptionHandler(Exception ex) {
		logger.error(generateErrorMessage(ex), ex);
		
		String message = "Please provide a valid transaction.";
		return new ResponseEntity<>(new ErrorMessageDTO(message), jsonHeaders, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler({ RuntimeException.class, Exception.class })
	public ResponseEntity<ErrorMessageDTO> generalExceptionHandler(Exception ex) {
		logger.error("An exception occurred in " + ex.getStackTrace()[0].getClassName(), ex);
		
		String message = "An unknown error occurred. Please try again later.";
		return new ResponseEntity<>(new ErrorMessageDTO(message), jsonHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(EmailInUseException.class)
	public ResponseEntity<ErrorMessageDTO> emailInUseExceptionHandler(Exception ex) {
		logger.error(generateErrorMessage(ex), ex);
		
		String message = "Email is already being used. Please use another email or login with that account.";
		return new ResponseEntity<>(new ErrorMessageDTO(message), jsonHeaders, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(UsernameInUseException.class)
	public ResponseEntity<ErrorMessageDTO> usernameInUseExceptionHandler(Exception ex) {
		logger.error(generateErrorMessage(ex), ex);
		
		String message = "Username is already being used. Please use another one.";
		return new ResponseEntity<>(new ErrorMessageDTO(message), jsonHeaders, HttpStatus.BAD_REQUEST);
	}
	
}
