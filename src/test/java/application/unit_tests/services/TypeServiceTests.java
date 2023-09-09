package application.unit_tests.services;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import application.dtos.TypeDTO;
import application.entities.Type;
import application.repositories.ITypeRepository;
import application.services.TypeService;
import application.utilities.IMapper;

public class TypeServiceTests {

	private ITypeRepository mockTypeRepository;
	private IMapper mockMapper;
	private TypeService typeService;
	
	@BeforeEach
	public void setup() {
		mockTypeRepository = mock(ITypeRepository.class);
		mockMapper = mock(IMapper.class);
		typeService = new TypeService(mockTypeRepository, mockMapper);
	}
	
	@Test
	public void getType_twoTypesSaved_success() {
		// Arrange
		List<Type> types = List.of(
				new Type(),
				new Type()
		);
		when(mockTypeRepository.findAll()).thenReturn(types);
		when(mockMapper.map(any(Type.class))).thenReturn(new TypeDTO());
		
		// Act
		List<TypeDTO> typeDTOs = typeService.getTypes();
		
		// Assert
		assertTrue(typeDTOs.size() > 0);
		assertEquals(typeDTOs.size(), types.size());
	}
	
	@Test
	public void getType_zeroTypesSaved_success() {
		// Arrange
		List<Type> types = new ArrayList<>();
		when(mockTypeRepository.findAll()).thenReturn(types);
		when(mockMapper.map(any(Type.class))).thenReturn(new TypeDTO());
		
		// Act
		List<TypeDTO> typeDTOs = typeService.getTypes();
		
		// Assert
		assertTrue(typeDTOs.size() == 0);
	}
}
