import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public cartStatus = new Subject<boolean>();
  public orderStatus = false;
  public userStatus = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  public addUser(user: any) {
    return this.http.post(`${baseUrl}/users/`, user);
  }

  public updateUser(user: any) {
    return this.http.put(`${baseUrl}/users/`, user);
  }

  public getUsers() {
    return this.http.get(`${baseUrl}/users/`);
  }

  public getUser(user_id: any) {
    return this.http.get(`${baseUrl}/users/user/${user_id}`);
  }

  public confirmPassword(user: any) {
    return this.http.post(`${baseUrl}/users/confirm-password`, user);
  }

  public changePassword(user: any) {
    return this.http.post(`${baseUrl}/users/change-password`, user);
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

  public deleteProductsFromCart(cart_id: any) {
    return this.http.delete(`${baseUrl}/users/cart/${cart_id}`);
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

  public createOrder(order: any) {
    return this.http.post(`${baseUrl}/users/order`, order);
  }

  public getOrders(user_id: any) {
    return this.http.get(`${baseUrl}/users/order/${user_id}`);
  }

  public getOrderProducts(order_id: any) {
    return this.http.get(`${baseUrl}/users/order-product/${order_id}`);
  }

  public getPendingOrder() {
    return this.http.get(`${baseUrl}/users/orders`);
  }
}
