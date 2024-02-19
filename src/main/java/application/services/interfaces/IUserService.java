package application.services.interfaces;

import application.dtos.UserDTO;
import application.exceptions.EmailInUseException;
import application.exceptions.UsernameInUseException;

public interface IUserService {
	
	public void registerUser(UserDTO userDTO) throws EmailInUseException, UsernameInUseException;

}
