package application.dtos;

import java.util.Objects;

import jakarta.validation.constraints.NotNull;

public class CategoryDTO {
	
	@NotNull
	private Integer id;
	private String name;
	private TypeDTO type;
	
	public CategoryDTO() {
	}

	public CategoryDTO(int id, String name, TypeDTO type) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
	}

	public int getId() {
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
		return id == other.id && Objects.equals(name, other.name) && Objects.equals(type, other.type);
	}

}
