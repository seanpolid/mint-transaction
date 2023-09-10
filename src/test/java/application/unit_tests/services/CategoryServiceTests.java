package application.unit_tests.services;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import application.dtos.CategoryDTO;
import application.entities.Category;
import application.repositories.ICategoryRepository;
import application.services.CategoryService;
import application.utilities.IMapper;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;

public class CategoryServiceTests {

	private ICategoryRepository mockCategoryRepository;
	private IMapper mockMapper;
	private CategoryService categoryService;
	
	@BeforeEach
	public void setup() {
		mockCategoryRepository = mock(ICategoryRepository.class);
		mockMapper = mock(IMapper.class);
		categoryService = new CategoryService(mockCategoryRepository, mockMapper);
	}
	
	@Test
	public void getCategories_twoCategoriesSaved_success() {
		// Arrange
		List<Category> categories = List.of(
				new Category(),
				new Category()
		);
		when(mockCategoryRepository.findAll()).thenReturn(categories);
		when(mockMapper.map(any(Category.class))).thenReturn(new CategoryDTO());
		
		// Act
		List<CategoryDTO> categoryDTOs = categoryService.getCategories();
		
		// Assert
		assertTrue(categoryDTOs.size() > 0);
		assertEquals(categoryDTOs.size(), categories.size());
	}
	
	@Test
	public void getCategories_zeroCategoriesSaved_success() {
		// Arrange
		List<Category> categories = new ArrayList<>();
		when(mockCategoryRepository.findAll()).thenReturn(categories);
		when(mockMapper.map(any(Category.class))).thenReturn(new CategoryDTO());
		
		// Act
		List<CategoryDTO> categoryDTOs = categoryService.getCategories();
		
		// Assert
		assertTrue(categoryDTOs.size() == 0);
	}
}
