package application.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import application.models.RegistrationForm;
import application.services.UserService;

@Controller
public class ViewController {
	
	private final UserService userService;
	
	public ViewController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/")
	public String app() {
		return "index.html";
	}
	
	@GetMapping("/home")
	public String home() {
		return "home.html";
	}
	
	@GetMapping("/login")
	public String login() {
		return "login.html";
	}
	
	@PostMapping("/register") 
	public String register(RegistrationForm form) {
		userService.registerUser(form);
		return "redirect:/login";
	}
	
}
