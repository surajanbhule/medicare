package com.medicare.services;

import com.medicare.models.Cart;
import com.medicare.models.User;

public interface CartService {

    public Cart createCart(Cart cart);

    public Cart updateCart(Cart cart);

    public Cart getCart(User user);

    public void deleteCart(Long cart_id);

    public void deleteProductFromCart(Long cart_id,Long product_id);




}
