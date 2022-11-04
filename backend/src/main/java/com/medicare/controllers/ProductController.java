package com.medicare.controllers;

import com.medicare.models.Category;
import com.medicare.models.Product;
import com.medicare.services.CategoryService;
import com.medicare.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @PostMapping(value = "/")
    public Product addProduct(@RequestBody Product product){
        return productService.addProduct(product);
    }

    @PutMapping("/")
    public Product updateProduct(@RequestBody Product updatedProduct){
        return productService.updateProduct(updatedProduct);
    }

    @DeleteMapping("/{product_id}")
    public void deleteProduct(@PathVariable("product_id") Long product_id){
        productService.deleteProduct(product_id);
    }

    @GetMapping("/")
    public Set<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @GetMapping("/{product_id}")
    public Product getProduct(@PathVariable("product_id") Long product_id){
        return productService.getProduct(product_id);
    }

    @GetMapping("/products_by_category")
    public Set<Product> getProductsOfCategory(@RequestBody Category category){
        return productService.getProductsOfCategory(category);
    }



    // ------------- Category Service Endpoints ------------------

    @PostMapping("/category")
    public Category addCategory(@RequestBody Category category){
        return  categoryService.addCategory(category);
    }

    @PutMapping("/category")
    public Category updateCategory(@RequestBody Category updatedCategory){
        return categoryService.updateCategory(updatedCategory);
    }

    @GetMapping("/category")
    public Set<Category> getCategories(){
        return categoryService.getAllCategories();
    }

    @GetMapping("/category/{category_id}")
    public Category getCategory(@PathVariable("category_id") Long category_id){
        return categoryService.getCategory(category_id);
    }

    @DeleteMapping("/category/{category_id}")
    public void deleteCategory(@PathVariable("category_id") Long category_id){
        categoryService.deleteCategory(category_id);
    }
}
