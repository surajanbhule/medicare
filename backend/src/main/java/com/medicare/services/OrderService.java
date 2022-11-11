package com.medicare.services;


import com.medicare.models.Product;
import com.medicare.models.User;
import com.medicare.models.UserOrders;

import java.util.Set;

public interface OrderService {

    public UserOrders createOrder(UserOrders order);
    public Set<UserOrders> getOrders(User user);

    public Set<UserOrders> getAllOrders();

    public Set<UserOrders> getAllPendingOrders();

    public Set<Product> getProducts(Long user_order_id);

    public UserOrders completeOrder(Long order_id);
}
