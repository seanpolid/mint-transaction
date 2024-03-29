package application.integration_tests.exceptions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class ExceptionTestControllerTests {

	@Autowired
	private MockMvc mockMvc;
	
	@Test
	public void throwsRuntimeException_statusInternalServerError() throws Exception {
		mockMvc.perform(get("/exceptions/runtime"))
			   .andExpectAll(status().isInternalServerError(),
					   		 content().contentType("application/json"));
	}
	
	@Test
	public void throwsCheckedException_statusInternalServerError() throws Exception {
		mockMvc.perform(get("/exceptions/checked"))
			   .andExpectAll(status().isInternalServerError(),
					   		 content().contentType("application/json"));
	}
	
	@Test
	public void throwsCategoryNotFoundException_idInvalid_statusBadRequest() throws Exception {
		mockMvc.perform(get("/exceptions/category-not-found"))
			   .andExpectAll(status().isBadRequest(),
					   		 content().contentType("application/json"));
	}
	
	@Test
	public void throwsTransactionNotFoundException_statusNotFound() throws Exception {
		mockMvc.perform(get("/exceptions/transaction-not-found"))
			   .andExpectAll(status().isNotFound(),
					   		 content().contentType("application/json"));
	}
	
	@Test
	public void throwsInvalidTransactionIdentifierException_statusBadRequest() throws Exception {
		mockMvc.perform(get("/exceptions/invalid-transaction-identifier"))
			   .andExpectAll(status().isBadRequest(),
					   		 content().contentType("application/json"));
	}
	
	@Test
	public void throwsEmailInUseException_statusBadRequest() throws Exception {
		mockMvc.perform(get("/exceptions/email-in-use"))
			   .andExpectAll(status().isBadRequest(),
					   		 content().contentType("application/json"));
	}
	
	@Test
	public void throwsUsernameInUseException_statusBadRequest() throws Exception {
		mockMvc.perform(get("/exceptions/username-in-use"))
			   .andExpectAll(status().isBadRequest(),
					   		 content().contentType("application/json"));
	}
	
}
