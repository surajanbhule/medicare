package com.medicare.services;

import com.medicare.models.Category;

import java.util.Set;

public interface CategoryService {

    public Category addCategory(Category category);

    public void deleteCategory(Long category_id);

    public Category updateCategory(Category updatedCategory);

    public Category getCategory(Long category_id);

    public Set<Category> getAllCategories();

    public Set<Category> getPopularCategories();

}
