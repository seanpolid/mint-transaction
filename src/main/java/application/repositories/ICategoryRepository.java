package application.repositories;

import org.springframework.data.repository.ListCrudRepository;

import application.entities.Category;

public interface ICategoryRepository extends ListCrudRepository<Category, Integer> {

}
