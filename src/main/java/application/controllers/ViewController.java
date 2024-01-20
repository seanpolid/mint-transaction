package application.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

	@GetMapping("/")
	public String home() {
		return "redirect:/transactions/add";
	}
	
	@GetMapping("/transactions/add")
	public String transactions() {
		return "index.html";
	}
	
}
