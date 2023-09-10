package application.dtos;

import java.time.LocalDate;
import java.util.Objects;

public class TransactionDTO {

	private int id;
	private String identifier;
	private int amount;
	private LocalDate startDate;
	private LocalDate endDate;
	private String notes;
	public String category;
	
	public TransactionDTO() {
	}
	
	public TransactionDTO(int id) {
		this.id = id;
	}

	public TransactionDTO(int id, String identifier, int amount, LocalDate startDate, LocalDate endDate, 
			String notes, String category) {
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

	public void setId(int id) {
		this.id = id;
	}

	public String getIdentifier() {
		return identifier;
	}

	public void setIdentifier(String identifier) {
		this.identifier = identifier;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
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

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	@Override
	public int hashCode() {
		return Objects.hash(amount, category, endDate, id, notes, startDate);
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
		return amount == other.amount && Objects.equals(category, other.category)
				&& Objects.equals(endDate, other.endDate) && id == other.id && Objects.equals(notes, other.notes)
				&& Objects.equals(startDate, other.startDate);
	}
}
