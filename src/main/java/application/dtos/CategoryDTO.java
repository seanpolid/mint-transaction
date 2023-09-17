package application.dtos;

import java.util.Objects;

public class CategoryDTO {

	private int id;
	private String name;
	private int typeId;
	
	public CategoryDTO() {
	}

	public CategoryDTO(int id, String name, int typeId) {
		super();
		this.id = id;
		this.name = name;
		this.typeId = typeId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getTypeId() {
		return typeId;
	}

	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, typeId);
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
		return id == other.id && Objects.equals(name, other.name) && typeId == other.typeId;
	}

}
