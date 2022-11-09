package com.medicare.repositories;

import com.medicare.models.Address;
import com.medicare.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface AddressRepository extends JpaRepository<Address, Long> {
    public Set<Address> findByUser(User user);
}