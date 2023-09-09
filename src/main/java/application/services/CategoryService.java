package application.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import application.dtos.CategoryDTO;
import application.entities.Category;
import application.repositories.ICategoryRepository;
import application.services.interfaces.ICategoryService;
import application.utilities.IMapper;

@Component
public class CategoryService implements ICategoryService {
	
	private final ICategoryRepository categoryRepository;
	private final IMapper mapper;
	
	public CategoryService(ICategoryRepository categoryRepository, IMapper mapper) {
		this.categoryRepository = categoryRepository;
		this.mapper = mapper;
	}
	
	@Override
	public List<CategoryDTO> getCategories() {
		List<CategoryDTO> categoryDTOs = new ArrayList<>();
		
		List<Category> categories = categoryRepository.findAll();
		for (Category category : categories) {
			CategoryDTO categoryDTO = mapper.map(category);
			categoryDTOs.add(categoryDTO);
		}
		
		return categoryDTOs;
	}

}
