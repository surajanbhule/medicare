package com.medicare.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String product_name;
    @Column(length = 5000)
    private String product_description;
    private Double product_price;
    private byte product_discount;
    private Double product_selling_price;
    private Long product_stock;
    @ManyToOne()
    @JoinColumn(name = "category_id")
    private Category category;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "product_images",
    joinColumns = {@JoinColumn(name = "product_id")},
    inverseJoinColumns = {@JoinColumn(name = "image_id")})
    private Set<ProductImage> product_images;

    public Product() {
    }

    public Product(Long id, String product_name, String product_description, Double product_price, byte product_discount, Long product_stock, Category category) {
        this.id = id;
        this.product_name = product_name;
        this.product_description = product_description;
        this.product_price = product_price;
        this.product_discount = product_discount;
        this.product_selling_price = product_price - (product_price/100) * product_discount;
        this.product_stock = product_stock;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public String getProduct_description() {
        return product_description;
    }

    public void setProduct_description(String product_description) {
        this.product_description = product_description;
    }

    public Double getProduct_price() {
        return product_price;
    }

    public void setProduct_price(Double product_price) {
        this.product_price = product_price;
    }

    public byte getProduct_discount() {
        return product_discount;
    }

    public void setProduct_discount(byte product_discount) {
        this.product_discount = product_discount;
    }

    public Double getProduct_selling_price() {
        return product_selling_price;
    }


    public Long getProduct_stock() {
        return product_stock;
    }

    public void setProduct_stock(Long product_stock) {
        this.product_stock = product_stock;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<ProductImage> getProduct_images() {
        return product_images;
    }

    public void setProduct_images(Set<ProductImage> product_images) {
        this.product_images = product_images;
    }
}