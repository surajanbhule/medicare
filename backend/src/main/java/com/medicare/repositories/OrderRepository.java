package com.medicare.repositories;


import com.medicare.models.User;
import com.medicare.models.UserOrders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface OrderRepository extends JpaRepository<UserOrders, Long> {
    public Set<UserOrders> findByUser(User user);

    public Set<UserOrders> findByIsPending(Boolean isPending);
}