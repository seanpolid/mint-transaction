package application.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import application.dtos.CategoryDTO;
import application.services.interfaces.ICategoryService;

@RestController
@RequestMapping("api/categories")
@CrossOrigin(origins={"http://localhost:5173/"})
public class CategoryController {

	private final ICategoryService categoryService;
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	public CategoryController(ICategoryService categoryService) {
		this.categoryService = categoryService;
	}
	
	@GetMapping
	public ResponseEntity<Object> getCategories() throws Exception {
		logger.info("Retrieving categories");
		List<CategoryDTO> categories = categoryService.getCategories();
		logger.info("Successfully retrieved categories");
		
		return new ResponseEntity<Object>(categories, HttpStatus.OK);
	}
}
