package application.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import application.dtos.TypeDTO;
import application.services.interfaces.ITypeService;

@RestController
@RequestMapping("api/types")
@CrossOrigin(origins={"http://localhost:5173/"})
public class TypeController {

	private final ITypeService typeService;
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	public TypeController(ITypeService typeService) {
		this.typeService = typeService;
	}
	
	@GetMapping
	public ResponseEntity<Object> getTypes() {
		logger.info("Retrieving types");
		List<TypeDTO> types = typeService.getTypes();
		logger.info("Successfully retrieved types");
		
		return new ResponseEntity<Object>(types, HttpStatus.OK);
	}
}
