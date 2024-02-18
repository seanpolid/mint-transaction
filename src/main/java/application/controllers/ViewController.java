package application.controllers;

import org.springframework.security.core.Authentication;
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
	
	@GetMapping(value = {"/transactions", "/"})
	public String transactionsRedirect() {
		return "redirect:/transactions/add";
	}
	
	@GetMapping(value = {"/goals"})
	public String goalsRedirect() {
		return "redirect:/goals/add";
	}
	
	@GetMapping(value = {"/transactions/add", "/transactions/view", "/dashboard", "/goals/add", "/goals/view", "/profile"})
	public String app() {
		return "/app/index.html";
	}
	
	@GetMapping("/home")
	public String home() {
		return "home.html";
	}
	
	@GetMapping("/login")
	public String login(Authentication authentication) {
		if (authentication != null && authentication.isAuthenticated()) {
			return "redirect:/transactions/add";
		}
		
		return "login/index.html";
	}
	
	@PostMapping("/register") 
	public String register(RegistrationForm form) {
		userService.registerUser(form);
		return "redirect:/login";
	}
	
}
