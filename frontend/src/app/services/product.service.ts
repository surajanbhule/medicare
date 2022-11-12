import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/model/product.model';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public searchStatus = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  public addProduct(product: FormData) {
    return this.http.post(`${baseUrl}/products/`, product);
  }

  public getProducts() {
    return this.http.get(`${baseUrl}/products/`);
  }

  public searchProducts(model: any) {
    return this.http.get(`${baseUrl}/products/search/${model}`);
  }

  public searchProductsStartWith(model: any) {
    return this.http.get(`${baseUrl}/products/search-startwith/${model}`);
  }

  public getProductsByCategory(cat_id: any) {
    console.log(cat_id);
    return this.http.get(`${baseUrl}/categories/product-list/${cat_id}`);
  }

  public deleteProduct(id: any) {
    return this.http.delete(`${baseUrl}/products/${id}`);
  }

  public getProduct(id: any) {
    return this.http.get(`${baseUrl}/products/${id}`);
  }

  public updateProduct(product: FormData) {
    return this.http.put(`${baseUrl}/products/`, product);
  }

  public addCategory(category: any) {
    return this.http.post(`${baseUrl}/categories`, category);
  }

  public getCategories() {
    return this.http.get(`${baseUrl}/categories`);
  }

  public getPopularCategories() {
    return this.http.get(`${baseUrl}/categories/popular`);
  }

  public getCategory(id: any) {
    return this.http.get(`${baseUrl}/categories/${id}`);
  }

  public deleteCategory(id: any) {
    return this.http.delete(`${baseUrl}/categories/${id}`);
  }

  public updateCategory(category: any) {
    return this.http.put(`${baseUrl}/categories`, category);
  }
}
