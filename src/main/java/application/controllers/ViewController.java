package application.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
	
	@GetMapping(value = "/**/{path:[^\\.]*}")
    public String getIndex() {
        return "forward:/";
    }
	
	@GetMapping("/")
	public String index() {
		return "/index.html";
	}
	
	@GetMapping("/login")
	public String login(Authentication authentication) {
		if (authentication != null && authentication.isAuthenticated()) {
			return "redirect:/transactions/add";
		}
		
		return "login/index.html";
	}
	
}
