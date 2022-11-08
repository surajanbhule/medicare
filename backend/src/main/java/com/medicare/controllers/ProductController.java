package com.medicare.controllers;

import com.medicare.models.Category;
import com.medicare.models.Product;
import com.medicare.models.ProductImage;
import com.medicare.services.CategoryService;
import com.medicare.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @PostMapping(value = "/",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Product addProduct(@RequestPart("product") Product product,
                              @RequestPart("imageFile")MultipartFile[] file){
//        return productService.addProduct(product);

        try{
         Set<ProductImage> images = uploadImage(file);
         product.setProduct_images(images);
            return productService.addProduct(product);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public Set<ProductImage> uploadImage(MultipartFile[] file) throws IOException {
        Set<ProductImage> productImages = new HashSet<>();

        for(MultipartFile file1:file){
            ProductImage productImage = new ProductImage();
            productImage.setName(file1.getOriginalFilename());
            productImage.setType(file1.getContentType());
            productImage.setImageByte(file1.getBytes());

            productImages.add(productImage);

        }
        return productImages;
    }

    @PutMapping(value="/",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Product updateProduct(@RequestPart("product") Product product,
                                 @RequestPart("imageFile")MultipartFile[] file){


        try{
            Set<ProductImage> images = uploadImage(file);
            product.setProduct_images(images);
            return productService.updateProduct(product);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
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


}
