package application.integration_tests.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class ViewController {

	@Autowired
	private MockMvc mockMvc;
	
	@Test
	public void basePath_redirect() throws Exception {
		mockMvc.perform(get("/"))
			   .andExpectAll(status().is3xxRedirection(),
					   		 header().string("Location", "http://localhost/login"));
	}
	
	@Test
	public void transactions_redirect() throws Exception {
		mockMvc.perform(get("/transactions"))
		   	   .andExpectAll(status().is3xxRedirection(),
		   			   		 header().string("Location", "http://localhost/login"));
	}
	
	@Test
	public void transactionsAdd_redirect() throws Exception {
		mockMvc.perform(get("/transactions/add"))
	   	   	   .andExpectAll(status().is3xxRedirection(),
	   			   		 	 header().string("Location", "http://localhost/login"));
	}
	
	@Test
	public void transactionsView_redirect() throws Exception {
		mockMvc.perform(get("/transactions/view"))
	   	   	   .andExpectAll(status().is3xxRedirection(),
	   			   		 	 header().string("Location", "http://localhost/login"));
	}
	
	@Test
	public void dashboard_redirect() throws Exception {
		mockMvc.perform(get("/dashboard"))
	   	   	   .andExpectAll(status().is3xxRedirection(),
			   		 	 	 header().string("Location", "http://localhost/login"));
	}
	
	@Test
	public void goals_redirect() throws Exception {
		mockMvc.perform(get("/goals"))
			   .andExpectAll(status().is3xxRedirection(),
					   	  header().string("Location", "http://localhost/login"));
	}
	
	@Test
	public void goalsAdd_redirect() throws Exception {
		mockMvc.perform(get("/goals/add"))
			   .andExpectAll(status().is3xxRedirection(),
					   	  header().string("Location", "http://localhost/login"));
	}
	
	@Test
	public void goalsView_redirect() throws Exception {
		mockMvc.perform(get("/goals/view"))
			   .andExpectAll(status().is3xxRedirection(),
					   	  header().string("Location", "http://localhost/login"));
	}
	
	@Test
	public void profile_redirect() throws Exception {
		mockMvc.perform(get("/profile"))
	   	   	   .andExpectAll(status().is3xxRedirection(),
			   		 	 	 header().string("Location", "http://localhost/login"));
	}
	
	@Test
	@WithMockUser
	public void transactionsRedirect_baseTransactionsPath_success() throws Exception {
		mockMvc.perform(get("/transactions"))
			   .andExpectAll(status().is3xxRedirection(),
					   		 header().string("Location", "/transactions/add"));
	}
	
	@Test
	@WithMockUser
	public void transactionsRedirect_basePath_success() throws Exception {
		mockMvc.perform(get("/"))
		   	   .andExpectAll(status().is3xxRedirection(),
				   		 	 header().string("Location", "/transactions/add"));
	}
	
	@Test
	@WithMockUser
	public void goalsRedirect_baseGoalsPath_success() throws Exception {
		mockMvc.perform(get("/goals"))
			   .andExpectAll(status().is3xxRedirection(),
					   		 header().string("Location", "/goals/add"));
	}
	
	@Test
	@WithMockUser
	public void transactionsAdd_success() throws Exception {
		mockMvc.perform(get("/transactions/add"))
			   .andExpectAll(status().isOk());
	}
	
	@Test
	@WithMockUser
	public void transactionsView_success() throws Exception {
		mockMvc.perform(get("/transactions/view"))
		   	   .andExpectAll(status().isOk());
	}
	
	@Test
	@WithMockUser
	public void dashboard_success() throws Exception {
		mockMvc.perform(get("/dashboard"))
		   	   .andExpectAll(status().isOk());
	}
	
	@Test
	@WithMockUser
	public void goalsAdd_success() throws Exception {
		mockMvc.perform(get("/goals/add"))
			   .andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser
	public void goalsView_success() throws Exception {
		mockMvc.perform(get("/goals/view"))
			   .andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser
	public void profile_success() throws Exception {
		mockMvc.perform(get("/profile"))
		       .andExpect(status().isOk());
	}
	
	@Test
	public void home_success() throws Exception {
		mockMvc.perform(get("/home"))
			   .andExpect(status().isOk());
	}
	
	@Test
	public void login_success() throws Exception {
		mockMvc.perform(get("/login"))
			   .andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser
	public void login_authenticated_redirect() throws Exception {
		mockMvc.perform(get("/login"))
		       .andExpectAll(status().is3xxRedirection(),
		    		     	 header().string("Location", "/transactions/add"));
	}
}
