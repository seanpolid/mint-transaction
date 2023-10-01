package application.dtos;

import java.util.Objects;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class CategoryDTO {
	
	@NotNull
	@Min(value=1)
	private Integer id;
	
	@NotEmpty
	private String name;
	
	@NotNull
	@Valid
	private TypeDTO type;
	
	public CategoryDTO() {
	}

	public CategoryDTO(Integer id, String name, TypeDTO type) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
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

	public TypeDTO getType() {
		return type;
	}

	public void setType(TypeDTO type) {
		this.type = type;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, type);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CategoryDTO other = (CategoryDTO) obj;
		return id.equals(other.id) && Objects.equals(name, other.name) && Objects.equals(type, other.type);
	}

}
