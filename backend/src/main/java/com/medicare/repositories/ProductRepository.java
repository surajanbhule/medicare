package com.medicare.repositories;

import com.medicare.models.Category;
import com.medicare.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface ProductRepository extends JpaRepository<Product, Long> {

    public Set<Product> findByCategory(Category category);

    @Query("SELECT p FROM Product p WHERE p.product_name LIKE :product_name%")
    public Set<Product> findByProduct_NameStartLike(@Param("product_name") String product_name);

    @Query("SELECT p FROM Product p WHERE p.product_name LIKE %:product_name%")
    public Set<Product> findByProduct_NameLike(@Param("product_name") String product_name);


}