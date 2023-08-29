package application.controllers;

import org.springframework.web.bind.annotation.RestController;

import application.repositories.IGoalRepository;

@RestController
public class GoalController {

	private final IGoalRepository goalRepository;
	
	public GoalController(IGoalRepository goalRepository) {
		this.goalRepository = goalRepository;
	}
}
