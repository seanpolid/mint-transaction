package application.dtos;

import java.time.LocalDate;

public class TransactionDTO {

	private int id;
	private int amount;
	private LocalDate startDate;
	private LocalDate endDate;
	private String notes;
	public String category;

	public TransactionDTO(int id, int amount, LocalDate startDate, LocalDate endDate, String notes, String category) {
		super();
		this.id = id;
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
}