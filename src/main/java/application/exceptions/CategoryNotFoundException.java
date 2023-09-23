package application.exceptions;

public class CategoryNotFoundException extends Exception {

	private static final long serialVersionUID = 1L;
	
	public CategoryNotFoundException() {
		super("Provided Category was null.");
	}

	public CategoryNotFoundException(int id) {
		super("Could not find category with id: " + id);
	}
	
}
