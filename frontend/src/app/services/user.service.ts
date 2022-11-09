import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public cartStatus = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  public addUser(user: any) {
    return this.http.post(`${baseUrl}/users/`, user);
  }

  public getUsers() {
    return this.http.get(`${baseUrl}/users/`);
  }

  public addProductToCart(cart_id: any, product: any) {
    return this.http.post(`${baseUrl}/users/cart/${cart_id}`, product);
  }

  public getCart(user_id: any) {
    return this.http.get(`${baseUrl}/users/cart/${user_id}`);
  }

  public deleteProductFromCart(cart_id: any, product_id: any) {
    return this.http.delete(`${baseUrl}/users/cart/${cart_id}/${product_id}`);
  }

  public addAddress(address: any) {
    return this.http.post(`${baseUrl}/users/address`, address);
  }

  public updateAddress(address: any) {
    return this.http.put(`${baseUrl}/users/address`, address);
  }

  public getAddressesOfUser(user_id: any) {
    return this.http.get(`${baseUrl}/users/addresses/${user_id}`);
  }

  public getAddress(address_id: any) {
    return this.http.get(`${baseUrl}/users/address/${address_id}`);
  }

  public deleteAddress(address_id: any) {
    return this.http.delete(`${baseUrl}/users/delete-address/${address_id}`);
  }
}
