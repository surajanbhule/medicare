package com.medicare.services.impl;

import com.medicare.models.Address;
import com.medicare.models.User;
import com.medicare.repositories.AddressRepository;
import com.medicare.services.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;
    @Override
    public Address addAddress(Address address) {
        return addressRepository.save(address);
    }

    @Override
    public Address updateAddress(Address updatedAddress) {
        return addressRepository.save(updatedAddress);
    }

    @Override
    public void deleteAddress(Long address_id) {
        addressRepository.deleteById(address_id);
    }

    @Override
    public Set<Address> getAddressesOfUser(User user) {
        return new HashSet<>(addressRepository.findByUser(user));
    }

    @Override
    public Address getAddress(Long address_id) {
        return addressRepository.findById(address_id).get();
    }
}
