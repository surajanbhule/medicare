package com.medicare.services.impl;


import com.medicare.models.*;
import com.medicare.repositories.AddressRepository;
import com.medicare.repositories.OrderRepository;
import com.medicare.services.CartService;
import com.medicare.services.OrderService;
import com.medicare.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CartService cartService;

    @Override
    public UserOrders createOrder(UserOrders order) {

        User user = userService.getUserById(order.getUser().getId());

        Cart cart = cartService.getCart(user);

        Set<Product> products = cart.getProducts();

        Address address = addressRepository.findById(order.getAddress().getId()).get();

        Date date = new Date(System.currentTimeMillis());

        order.setOrder_date(date);

        order.setOrder_status("ORDER_PLACED");

        order.setAddress(address);

        order.getProducts().addAll(products);

        order.setUser(user);

        order.setPending(true);

        return orderRepository.save(order);
    }

    @Override
    public Set<UserOrders> getOrders(User user) {
        return new HashSet<>(orderRepository.findByUser(user));
    }

    @Override
    public Set<UserOrders> getAllOrders() {
        return new HashSet<>(orderRepository.findAll());
    }

    @Override
    public Set<UserOrders> getAllPendingOrders() {
        return orderRepository.findByIsPending(true);
    }

    @Override
    public Set<Product> getProducts(Long user_order_id) {
        return orderRepository.findById(user_order_id).get().getProducts();
    }
}