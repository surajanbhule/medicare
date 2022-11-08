package com.medicare.services.impl;

import com.medicare.models.Cart;
import com.medicare.models.User;
import com.medicare.models.UserRole;
import com.medicare.repositories.RoleRepository;
import com.medicare.repositories.UserRepository;
import com.medicare.services.CartService;
import com.medicare.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private CartService cartService;


    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        User local = userRepository.findByUsername(user.getUsername());
        if(local != null){
            System.err.println("User Already Exists");
            throw new Exception("User Already Exist");

        }else {
            local=this.userRepository.save(user);
            Cart cart = new Cart();
            cart.setUser(local);
            cartService.createCart(cart);
        }
        return local;
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User getUserById(Long user_id) {
        return userRepository.findById(user_id).get();
    }

    @Override
    public void deleteUser(Long user_id) {
        userRepository.deleteById(user_id);
    }

    @Override
    public User updateUser(User updatedUser) {
         User user= userRepository.findByUsername(updatedUser.getUsername());
         
        return userRepository.save(updatedUser);
    }

    @Override
    public Set<User> getUsers() {
        return new HashSet<>(userRepository.findAll());
    }
}
