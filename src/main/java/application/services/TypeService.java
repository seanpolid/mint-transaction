package application.services;

import java.util.List;

import org.springframework.stereotype.Component;

import application.dtos.TypeDTO;
import application.entities.Type;
import application.repositories.ITypeRepository;
import application.services.interfaces.ITypeService;
import application.utilities.IMapper;

@Component
public class TypeService implements ITypeService {

	private final ITypeRepository typeRepository;
	private final IMapper mapper;
	
	public TypeService(ITypeRepository typeRepository, IMapper mapper) {
		this.typeRepository = typeRepository;
		this.mapper = mapper;
	}
	
	@Override
	public List<TypeDTO> getTypes() {
		List<Type> types = typeRepository.findAll();
		
		return types.stream()
				.map(type -> mapper.map(type))
				.toList();
	}

}
