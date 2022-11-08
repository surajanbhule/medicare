package com.medicare.controllers;

import com.medicare.models.Category;
import com.medicare.models.Product;
import com.medicare.services.CategoryService;
import com.medicare.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;


    // ------------- Category Service Endpoints ------------------

    @PostMapping("")
    public Category addCategory(@RequestBody Category category){
        return  categoryService.addCategory(category);
    }

    @PutMapping("")
    public Category updateCategory(@RequestBody Category updatedCategory){
        return categoryService.updateCategory(updatedCategory);
    }

    @GetMapping("")
    public Set<Category> getCategories(){
        return categoryService.getAllCategories();
    }

    @GetMapping("/{category_id}")
    public Category getCategory(@PathVariable("category_id") Long category_id){
        return categoryService.getCategory(category_id);
    }

    @GetMapping("/product-list/{category_id}")
    public Set<Product> getProductsOfCategory(@PathVariable("category_id") Long category_id){
        Category category = categoryService.getCategory(category_id);

        return productService.getProductsOfCategory(category);
    }

    @DeleteMapping("/{category_id}")
    public void deleteCategory(@PathVariable("category_id") Long category_id){
        categoryService.deleteCategory(category_id);
    }
}
