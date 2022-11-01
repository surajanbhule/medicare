package com.medicare;

import com.medicare.models.Role;
import com.medicare.models.User;
import com.medicare.models.UserRole;
import com.medicare.repositories.UserRepository;
import com.medicare.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class MedicareBackendApplication implements CommandLineRunner {
	@Autowired
	private UserService userService;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	@Autowired
	private UserRepository userRepository;
	public static void main(String[] args) {
		SpringApplication.run(MedicareBackendApplication.class, args);
	}

	@Override
	public void run(String... args)  {

		User user = new User();
		user.setUsername("admin");
		user.setUser_email("surajanbhule69@gmail.com");
		user.setPassword(passwordEncoder.encode("admin123"));
		user.setEnabled(true);
		user.setFirst_name("Suraj");
		user.setLast_name("Anbhule");
		user.setUser_phone("9689462739");

		Role adminRole = new Role();
		adminRole.setRole_name("ADMIN");


		Set<UserRole> userRoles = new HashSet<>();

		UserRole userRole = new UserRole();
		userRole.setRole(adminRole);
		userRole.setUser(user);

		userRoles.add(userRole);

		user.setUserRoles(userRoles);

		User local = userRepository.findByUsername(user.getUsername());
		if(local != null){
			System.err.println("User Already Exists");
			try {
				throw new Exception("User Already Exist");
			} catch (Exception e) {
				System.err.println("User Already Exist");
			}
		}
		else {

			try {
				userService.createUser(user, userRoles);
			} catch (Exception e) {
				throw new RuntimeException(e);
			}

		}
	}
}
