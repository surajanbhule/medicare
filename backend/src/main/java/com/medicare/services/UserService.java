package com.medicare.services;

import com.medicare.models.User;
import com.medicare.models.UserRole;

import java.util.Set;

public interface UserService {

    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

    public User getUserByUsername(String username);

    public void deleteUser(Long user_id);

    public User updateUser(User updatedUser);
}
