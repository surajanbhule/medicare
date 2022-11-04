package com.medicare.repositories;

import com.medicare.models.Category;
import com.medicare.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface ProductRepository extends JpaRepository<Product, Long> {

    public Set<Product> findByCategory(Category category);
}