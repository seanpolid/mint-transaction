package application.exceptions;

public class CategoryNotFoundException extends Exception {

	public CategoryNotFoundException(String categoryName) {
		super("Could not find category with name: " + categoryName);
	}
	
}
