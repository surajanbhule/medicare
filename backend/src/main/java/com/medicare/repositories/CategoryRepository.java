package com.medicare.repositories;

import com.medicare.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    public Set<Category> findByPopular(Boolean value);
}