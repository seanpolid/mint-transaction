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

import application.dtos.TypeDTO;
import application.entities.Type;
import application.repositories.ITypeRepository;
import application.services.TypeService;
import application.utilities.IMapper;

@SpringBootTest
@ActiveProfiles("test")
public class TypeServiceTests {

	@Autowired
	private TypeService typeService;
	
	@Autowired
	private ITypeRepository typeRepository;
	
	@Autowired
	private IMapper mapper;
	
	@BeforeEach
	public void setup() {
		typeRepository.deleteAll();
	}
	
	@AfterEach
	public void destroy() {
		typeRepository.deleteAll();
	}
	
	@Test
	public void getTypes_twoTypesSaved_success() {
		// Arrange
		List<Type> types = List.of(
				new Type(0, "type1"),
				new Type(0, "type2")
		);
		types = typeRepository.saveAll(types);
		Map<Integer, Type> typeMap = types.stream().collect(Collectors.toMap(Type::getId, type -> type));
		
		// Act
		List<TypeDTO> typeDTOs = typeService.getTypes();
		
		// Assert
		for (TypeDTO typeDTO : typeDTOs) {
			Type type = typeMap.get(typeDTO.getId());
			TypeDTO expectedTypeDTO = mapper.map(type);
			assertTrue(expectedTypeDTO.equals(typeDTO));
		}
	}
	
	@Test
	public void getTypes_zeroTypesSaved_success() {
		// Act
		List<TypeDTO> typeDTOs = typeService.getTypes();
		
		// Assert
		assertTrue(typeDTOs.size() == 0);
	}
}
