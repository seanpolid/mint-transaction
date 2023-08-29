package application.repositories;

import org.springframework.data.repository.ListCrudRepository;

import application.entities.Goal;

public interface IGoalRepository extends ListCrudRepository<Goal, Integer> {

}
