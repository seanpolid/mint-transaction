package application.controllers;

import org.springframework.web.bind.annotation.RestController;

import application.repositories.ICategoryRepository;

@RestController
public class CategoryController {

	private final ICategoryRepository categoryRepository;
	
	public CategoryController(ICategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}
}
