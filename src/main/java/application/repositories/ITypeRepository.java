package application.repositories;

import org.springframework.data.repository.ListCrudRepository;

import application.entities.Type;

public interface ITypeRepository extends ListCrudRepository<Type, Integer> {

}
