package application.entities;

import java.time.LocalDate;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="transaction")
public class Transaction {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private int amount;
	
	private LocalDate startDate;
	
	private LocalDate endDate;
	
	private String notes;
	
	@ManyToOne
	@JoinColumn(name="category_id")
	private Category category;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	public Transaction() {
	}

	public Transaction(int id, int amount, LocalDate startDate, LocalDate endDate, String notes) {
		super();
		this.id = id;
		this.amount = amount;
		this.startDate = startDate;
		this.endDate = endDate;
		this.notes = notes;
	}

	public Transaction(int id, int amount, LocalDate startDate, LocalDate endDate, String notes, Category category,
			User user) {
		super();
		this.id = id;
		this.amount = amount;
		this.startDate = startDate;
		this.endDate = endDate;
		this.notes = notes;
		this.category = category;
		this.user = user;
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
	
	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public int hashCode() {
		return Objects.hash(amount, category, endDate, id, notes, startDate, user);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Transaction other = (Transaction) obj;
		return amount == other.amount && Objects.equals(category, other.category)
				&& Objects.equals(endDate, other.endDate) && id == other.id && Objects.equals(notes, other.notes)
				&& Objects.equals(startDate, other.startDate) && Objects.equals(user, other.user);
	}
	
	
}
