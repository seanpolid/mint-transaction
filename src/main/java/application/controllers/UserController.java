package application.controllers;

import org.springframework.web.bind.annotation.RestController;

import application.repositories.IUserRepository;

@RestController
public class UserController {

	private final IUserRepository userRepository;
	
	public UserController(IUserRepository userRepository) {
		this.userRepository = userRepository;
	}
}
