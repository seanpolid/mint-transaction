package application.repositories;

import org.springframework.data.repository.ListCrudRepository;

import application.entities.User;

public interface IUserRepository extends ListCrudRepository<User, Integer> {

	public User findByUsername(String username);
	
}
