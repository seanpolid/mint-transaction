package application.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import application.dtos.TypeDTO;
import application.entities.Type;
import application.repositories.ITypeRepository;
import application.services.interfaces.ITypeService;

@RestController
@RequestMapping("/api/types")
public class TypeController {

	private final ITypeService typeService;
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	public TypeController(ITypeService typeService) {
		this.typeService = typeService;
	}
	
	@GetMapping
	public ResponseEntity<Object> getTypes() {
		logger.info("Retrieving types");
		
		try {
			List<TypeDTO> types = typeService.getTypes();
			logger.info("Successfully retrieved types");
			return new ResponseEntity<Object>(types, HttpStatus.OK);
		} catch (Exception ex) {
			logger.error("An exception occurred while retrieving types: " + ex);
			return new ResponseEntity<Object>("Could not retrieve types", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
