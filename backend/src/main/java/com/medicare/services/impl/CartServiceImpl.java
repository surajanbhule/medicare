package com.medicare.services.impl;

import com.medicare.models.Cart;
import com.medicare.models.Product;
import com.medicare.models.User;
import com.medicare.repositories.CartRepository;
import com.medicare.services.CartService;
import com.medicare.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductService productService;

    @Override
    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public Cart updateCart(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public Cart getCart(User user) {
        return cartRepository.findCartByUser(user);
    }

    @Override
    public void deleteCart(Long cart_id) {
        cartRepository.deleteById(cart_id);
    }

    @Override
    public void deleteProductFromCart(Long cart_id,Long product_id) {
        Cart cart = cartRepository.findById(cart_id).get();
        Product product = productService.getProduct(product_id);
       // Set<Product> product_list = new HashSet<>(cart.getProducts()) ;

        boolean removed = cart.getProducts().remove(product);

        if(removed){
            System.out.println("Item Deleted");
            cartRepository.save(cart);
        }else {
            System.out.println("Not deleted");
        }

    }


}
