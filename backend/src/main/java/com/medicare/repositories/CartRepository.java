package com.medicare.repositories;

import com.medicare.models.Cart;
import com.medicare.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart,Long> {

    public Cart findCartByUser(User user);
}