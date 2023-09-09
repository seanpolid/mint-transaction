package application.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import application.dtos.CategoryDTO;
import application.services.interfaces.ICategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	private final ICategoryService categoryService;
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	public CategoryController(ICategoryService categoryService) {
		this.categoryService = categoryService;
	}
	
	@GetMapping
	public ResponseEntity<Object> getCategories() {
		logger.info("Retrieving categories");
		
		try {
			List<CategoryDTO> categories = categoryService.getCategories();
			logger.info("Successfully retrieved categories");
			return new ResponseEntity<Object>(categories, HttpStatus.OK);
		} catch (Exception ex) {
			logger.error("An exception occurred while retrieving categories: " + ex);
			return new ResponseEntity<Object>("Could not retrieve categories.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
