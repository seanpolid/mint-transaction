package application.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
	
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
	
}
