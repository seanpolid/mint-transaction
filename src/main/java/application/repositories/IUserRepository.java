package application.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;

import application.entities.User;
import application.enums.AuthProvider;

public interface IUserRepository extends ListCrudRepository<User, Integer> {

	public Optional<User> findByUsername(String username);
	public Optional<User> findByUsernameAndAuthProvider(String username, AuthProvider authProvider);
	public Optional<User> findByEmail(String email);
	public void deleteByUsername(String username);
	
	@Query("UPDATE User SET password = :newPassword WHERE username = :username")
	@Modifying
	public void changePassword(String username, String newPassword);
	
}
