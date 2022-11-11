package com.medicare.services.impl;

import com.medicare.models.Category;
import com.medicare.repositories.CategoryRepository;
import com.medicare.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Long category_id) {
        categoryRepository.deleteById(category_id);
    }

    @Override
    public Category updateCategory(Category updatedCategory) {
        return categoryRepository.save(updatedCategory);
    }

    @Override
    public Category getCategory(Long category_id) {
        return categoryRepository.findById(category_id).get();
    }

    @Override
    public Set<Category> getAllCategories() {
        return new HashSet<>(categoryRepository.findAll());
    }

    @Override
    public Set<Category> getPopularCategories() {
        return categoryRepository.findByPopular(true);
    }
}
