package application.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import application.dtos.UserDTO;
import application.exceptions.EmailInUseException;
import application.exceptions.UsernameInUseException;
import application.services.interfaces.IUserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins={"http://localhost:5173/"})
public class UserController {
	
	private final IUserService userService;
	
	public UserController(IUserService userService) {
		this.userService = userService;
	}

	@PostMapping
	public ResponseEntity<Object> createUser(@RequestBody @Valid UserDTO userDTO) throws EmailInUseException, UsernameInUseException {
		userService.registerUser(userDTO);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
}
