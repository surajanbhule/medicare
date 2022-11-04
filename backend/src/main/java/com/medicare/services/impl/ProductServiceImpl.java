package com.medicare.services.impl;

import com.medicare.models.Category;
import com.medicare.models.Product;
import com.medicare.repositories.ProductRepository;
import com.medicare.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product addProduct(Product product) {
        System.out.println(product.getCategory().getId());
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Product updatedProduct) {
        return productRepository.save(updatedProduct);
    }

    @Override
    public Product getProduct(Long product_id) {
        return productRepository.findById(product_id).get();
    }

    @Override
    public Set<Product> getAllProducts() {
        return new HashSet<>(productRepository.findAll());
    }

    @Override
    public Set<Product> getProductsOfCategory(Category category) {
        return new HashSet<>(productRepository.findByCategory(category));
    }


    @Override
    public void deleteProduct(Long product_id) {
        productRepository.deleteById(product_id);
    }
}
