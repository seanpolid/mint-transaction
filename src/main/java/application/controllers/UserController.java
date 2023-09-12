package application.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import application.repositories.IUserRepository;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins={"http://localhost:5173/"})
public class UserController {

	private final IUserRepository userRepository;
	
	public UserController(IUserRepository userRepository) {
		this.userRepository = userRepository;
	}
}
