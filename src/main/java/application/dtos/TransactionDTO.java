package application.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class TransactionDTO {

	@NotNull
	@Min(value = 0)
	private Integer id;

	@NotBlank
	@Size(min=36, max=36)
	private String identifier;
	
	@Min(value = 0)
	private BigDecimal amount;
	
	@NotNull
	private LocalDate startDate;
	
	private LocalDate endDate;
	
	private String notes;
	
	@NotNull
	@Valid
	public CategoryDTO category;
	
	public TransactionDTO() {
	}
	
	public TransactionDTO(Integer id) {
		this.id = id;
	}

	public TransactionDTO(Integer id, String identifier, BigDecimal amount, LocalDate startDate, LocalDate endDate, 
			String notes, CategoryDTO category) {
		super();
		this.id = id;
		this.identifier = identifier;
		this.amount = amount;
		this.startDate = startDate;
		this.endDate = endDate;
		this.notes = notes;
		this.category = category;
	}

	public int getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getIdentifier() {
		return identifier;
	}

	public void setIdentifier(String identifier) {
		this.identifier = identifier;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public CategoryDTO getCategory() {
		return category;
	}

	public void setCategory(CategoryDTO category) {
		this.category = category;
	}

	@Override
	public int hashCode() {
		return Objects.hash(amount, category, endDate, id, identifier, notes, startDate);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TransactionDTO other = (TransactionDTO) obj;
		return Objects.equals(amount, other.amount) && Objects.equals(category, other.category)
				&& Objects.equals(endDate, other.endDate) && id.equals(other.id)
				&& Objects.equals(identifier, other.identifier) && Objects.equals(notes, other.notes)
				&& Objects.equals(startDate, other.startDate);
	}

	@Override
	public String toString() {
		return "TransactionDTO [id=" + id + ", identifier=" + identifier + ", amount=" + amount + ", startDate="
				+ startDate + ", endDate=" + endDate + ", notes=" + notes + ", category=" + category + "]";
	}
	
	
}
