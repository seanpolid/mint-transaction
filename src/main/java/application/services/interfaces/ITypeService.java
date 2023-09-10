package application.services.interfaces;

import java.util.List;

import application.dtos.TypeDTO;

public interface ITypeService {

	public List<TypeDTO> getTypes() throws Exception;
	
}
