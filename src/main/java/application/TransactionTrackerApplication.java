package application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class TransactionTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TransactionTrackerApplication.class, args);
	}

}
