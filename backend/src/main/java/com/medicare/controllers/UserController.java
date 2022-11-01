package com.medicare.controllers;

import com.medicare.models.Role;
import com.medicare.models.User;
import com.medicare.models.UserRole;
import com.medicare.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/")
    public User addUser(@RequestBody User user) throws Exception {

        Role role = new Role();
        role.setRole_name("NORMAL");

        Set<UserRole> userRoles = new HashSet<>();

        UserRole userRole = new UserRole();
        userRole.setRole(role);
        userRole.setUser(user);

        userRoles.add(userRole);

        user.setUserRoles(userRoles);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return  userService.createUser(user,userRoles);
    }

    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable("username") String username){
        return userService.getUserByUsername(username);
    }

    @DeleteMapping("/{user_id}")
    public void deleteUser(@PathVariable("user_id")Long user_id){
         userService.deleteUser(user_id);
    }

    @PutMapping("/")
    public User updateUser(@RequestBody User user)  {
        return userService.updateUser(user);
    }

}
