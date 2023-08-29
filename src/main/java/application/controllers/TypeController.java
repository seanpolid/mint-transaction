package application.controllers;

import org.springframework.web.bind.annotation.RestController;

import application.repositories.ITypeRepository;

@RestController
public class TypeController {

	private final ITypeRepository typeRepository;
	
	public TypeController(ITypeRepository typeRepository) {
		this.typeRepository = typeRepository;
	}
}
