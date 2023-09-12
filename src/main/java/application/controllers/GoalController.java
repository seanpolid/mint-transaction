package application.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import application.repositories.IGoalRepository;

@RestController
@RequestMapping("api/goals")
@CrossOrigin(origins={"http://localhost:5173/"})
public class GoalController {

	private final IGoalRepository goalRepository;
	
	public GoalController(IGoalRepository goalRepository) {
		this.goalRepository = goalRepository;
	}
}
