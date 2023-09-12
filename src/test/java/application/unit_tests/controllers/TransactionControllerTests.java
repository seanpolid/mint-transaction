package application.unit_tests.controllers;

import static org.mockito.Mockito.mock;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import application.controllers.TransactionController;
import application.services.interfaces.ITransactionService;

public class TransactionControllerTests {

	private ITransactionService mockTransactionService;
	private TransactionController transactionController;
	
	@BeforeEach
	public void setup() {
		mockTransactionService = mock(ITransactionService.class);
		transactionController = new TransactionController(mockTransactionService);
	}
	
	@Test
	public void saveTransactions_twoTransactionsToSave_statusCreated() {
		
	}
}
