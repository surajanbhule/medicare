package com.medicare.services;

import com.medicare.models.Address;
import com.medicare.models.User;

import java.util.Set;

public interface AddressService {

    public Address addAddress(Address address);

    public Address updateAddress(Address updatedAddress);

    public void deleteAddress(Long address_id);

    public Set<Address> getAddressesOfUser(User user);

    public Address getAddress(Long address_id);
}
