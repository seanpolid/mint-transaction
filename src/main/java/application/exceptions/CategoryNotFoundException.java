package application.exceptions;

public class CategoryNotFoundException extends Exception {

	private static final long serialVersionUID = 1L;

	public CategoryNotFoundException(String categoryName) {
		super("Could not find category with name: " + categoryName);
	}
	
}
