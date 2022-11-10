package com.medicare.controllers;

import com.medicare.models.*;
import com.medicare.repositories.CartRepository;
import com.medicare.repositories.ProductRepository;
import com.medicare.services.AddressService;
import com.medicare.services.CartService;
import com.medicare.services.OrderService;
import com.medicare.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private AddressService addressService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/")
    public User addUser(@RequestBody User user) throws Exception {

        Role role = new Role();
        role.setRole_name("NORMAL");

        Set<UserRole> userRoles = new HashSet<>();

        UserRole userRole = new UserRole();
        userRole.setRole(role);
        userRole.setUser(user);

        userRoles.add(userRole);

        user.setUserRoles(userRoles);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return  userService.createUser(user,userRoles);
    }

    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable("username") String username){
        return userService.getUserByUsername(username);
    }

    @GetMapping("/")
    public Set<User> getUsers(){
        return userService.getUsers();
    }

    @DeleteMapping("/{user_id}")
    public void deleteUser(@PathVariable("user_id")Long user_id){
         userService.deleteUser(user_id);
    }

    @PutMapping("/")
    public User updateUser(@RequestBody User user)  {
        return userService.updateUser(user);
    }

    @PostMapping("/cart/{cart_id}")
    public Product addToCart(@PathVariable("cart_id") Long cart_id,@RequestBody Product product){
        System.out.println("Add To Cart "+cart_id);
        Cart cart = cartRepository.findById(cart_id).get();
        System.out.println(cart.getId());
        Product Iproduct = productRepository.findById(product.getId()).get();
        cart.getProducts().add(Iproduct);
        cartRepository.save(cart);
        return product;
    }

    @GetMapping("/cart/{user_id}")
    public Cart getCartByUser(@PathVariable("user_id")Long user_id){
        User user = userService.getUserById(user_id);
        Cart cart = cartRepository.findCartByUser(user);
        return cart;
    }

    @DeleteMapping("/cart/{cart_id}/{product_id}")
    public void deleteProduct(@PathVariable("cart_id")Long cart_id,@PathVariable("product_id")Long product_id){
         cartService.deleteProductFromCart(cart_id,product_id);
    }

    @DeleteMapping("/cart/{cart_id}")
    public void deleteProducts(@PathVariable("cart_id")Long cart_id){
        cartService.deleteProductsFromCart(cart_id);
    }

    //Address Endpoints
    @PostMapping("/address")
    public Address addAddress(@RequestBody Address address){

        return addressService.addAddress(address);
    }

    @PutMapping("/address")
    public Address updateAddress(@RequestBody Address address){
        System.out.println(address.getUser());
        return addressService.updateAddress(address);
    }

    @GetMapping("/addresses/{user_id}")
    public Set<Address> getAddressesOfUser(@PathVariable("user_id") Long user_id){
        User user = userService.getUserById(user_id);
       return addressService.getAddressesOfUser(user);
    }

    @GetMapping("/address/{address_id}")
    public Address getAddress(@PathVariable("address_id") Long address_id){
        return addressService.getAddress(address_id);
    }

    @DeleteMapping("/delete-address/{address_id}")
    public void deleteAddress(@PathVariable("address_id") Long address_id){
         addressService.deleteAddress(address_id);
    }

    @PostMapping("/order")
    public UserOrders addOrder(@RequestBody UserOrders order){
        return orderService.createOrder(order);
    }

    @GetMapping("/order/{user_id}")
    public Set<UserOrders> getOrders(@PathVariable("user_id") Long user_id){
        User user = userService.getUserById(user_id);
        return orderService.getOrders(user);
    }

    @GetMapping("/order-product/{order_id}")
    public Set<Product> getProductsOfOrder(@PathVariable("order_id") Long order_id){
        return orderService.getProducts(order_id);
    }

    @GetMapping("/orders")
    public Set<UserOrders> getAllfOrder(){
        return orderService.getAllPendingOrders();
    }
}
