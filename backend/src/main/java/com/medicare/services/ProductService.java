package com.medicare.services;

import com.medicare.models.Category;
import com.medicare.models.Product;

import java.util.Set;

public interface ProductService {

    public Product addProduct(Product product);

    public Product updateProduct(Product updatedProduct);

    public Product getProduct(Long product_id);

    public Set<Product> getAllProducts();

    public Set<Product> getProductsOfCategory(Category category);

    public void deleteProduct(Long product_id);
}
