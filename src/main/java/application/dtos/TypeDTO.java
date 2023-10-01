package application.dtos;

import java.util.Objects;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class TypeDTO {

	@NotNull
	@Min(value=1)
	private Integer id;
	
	@NotEmpty
	private String name;
	
	public TypeDTO() {
	}
	
	public TypeDTO(Integer id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TypeDTO other = (TypeDTO) obj;
		return id.equals(other.id) && Objects.equals(name, other.name);
	}
}
