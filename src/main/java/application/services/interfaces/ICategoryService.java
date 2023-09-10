package application.services.interfaces;

import java.util.List;

import application.dtos.CategoryDTO;

public interface ICategoryService {

	public List<CategoryDTO> getCategories() throws Exception;
	
}
