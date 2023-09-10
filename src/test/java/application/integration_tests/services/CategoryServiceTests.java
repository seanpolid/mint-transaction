package application.integration_tests.services;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import application.dtos.CategoryDTO;
import application.entities.Category;
import application.entities.Type;
import application.repositories.ICategoryRepository;
import application.repositories.ITypeRepository;
import application.services.CategoryService;
import application.utilities.IMapper;

@SpringBootTest
@ActiveProfiles("test")
public class CategoryServiceTests {

	@Autowired
	private CategoryService categoryService;
	
	@Autowired
	private ICategoryRepository categoryRepository;
	
	@Autowired
	private ITypeRepository typeRepository;
	
	@Autowired
	private IMapper mapper;
	
	@BeforeEach
	public void setup() {
		categoryRepository.deleteAll();
	}
	
	@AfterEach
	public void destroy() {
		categoryRepository.deleteAll();
		typeRepository.deleteAll();
	}
	
	@Test
	public void getCategories_twoCategoriesSaved_success() {
		// Arrange
		Type type = new Type(0, "income");
		type = typeRepository.save(type);
		
		List<Category> categories = List.of(
				new Category(0, "job", type),
				new Category(0, "gift", type)
		);
		categories = categoryRepository.saveAll(categories);
		Map<Integer, Category> categoryMap = categories.stream().collect(Collectors.toMap(Category::getId, c -> c));
		
		// Act
		List<CategoryDTO> categoryDTOs = categoryService.getCategories();
		
		// Assert
		for (CategoryDTO categoryDTO : categoryDTOs) {
			Category category = categoryMap.get(categoryDTO.getId());
			CategoryDTO expectedCategoryDTO = mapper.map(category);
			assertTrue(expectedCategoryDTO.equals(categoryDTO));
		}
	}
	
	@Test
	public void getCategories_zeroCategoriesSaved_success() {
		// Act
		List<CategoryDTO> categoryDTOs = categoryService.getCategories();
		
		// Assert
		assertTrue(categoryDTOs.size() == 0);
	}
}
