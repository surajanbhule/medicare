package com.medicare.controllers;

import com.medicare.config.JwtUtils;
import com.medicare.models.JwtRequest;
import com.medicare.models.JwtResponse;
import com.medicare.models.User;
import com.medicare.services.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin("*")
public class AuthenticateController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtils jwtUtil;

    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try {
            aunthenticate(jwtRequest.getUsername(),jwtRequest.getPassword());
        }catch (UsernameNotFoundException e){
            throw new Exception("User not found with username");
        }

        UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getUsername());
        String token = this.jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void aunthenticate(String username , String password) throws Exception {


        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));
        }catch (DisabledException e){
           throw new Exception("User is disabled");
        }catch (BadCredentialsException e){
            throw new Exception("Invalid Credentials "+e.getMessage());
        }
    }

    @GetMapping("/current-user")
    public User getCurrentUser(Principal principal){

        return (User) this.userDetailsService.loadUserByUsername(principal.getName());
    }
}
