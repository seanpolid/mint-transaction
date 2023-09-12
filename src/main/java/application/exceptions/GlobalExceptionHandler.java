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
		logger.error("An exception occurred in " + ex.getStackTrace()[0].getClassName(), ex);
		return new ResponseEntity<String>("Please provide a valid category.", HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler({ RuntimeException.class, Exception.class })
	public ResponseEntity<String> generalExceptionHandler(Exception ex) {
		logger.error("An exception occurred in " + ex.getStackTrace()[0].getClassName(), ex);
		return new ResponseEntity<String>("An unknown error occurred. Please try again later.", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}
