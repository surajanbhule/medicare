import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public addProduct(product:any){
    return this.http.post(`${baseUrl}/products/`,product);
  }

  public getProducts(){
    return this.http.get(`${baseUrl}/products/`)
  }

  public deleteProduct(id:any){
    return this.http.delete(`${baseUrl}/products/${id}`)
  }

  public getProduct(id:any){
    return this.http.get(`${baseUrl}/products/${id}`)
  }

  public updateProduct(product:any){
    return this.http.put(`${baseUrl}/products/`,product)
  }

  public addCategory(category: any) {
    return this.http.post(`${baseUrl}/products/category`, category);
  }

  public getCategories() {
    return this.http.get(`${baseUrl}/products/category`);
  }

  public getCategory(id:any) {
    return this.http.get(`${baseUrl}/products/category/${id}`);
  }

  public deleteCategory(id: any) {
    return this.http.delete(`${baseUrl}/products/category/${id}`);
  }

  public updateCategory(category: any) {
    return this.http.put(`${baseUrl}/products/category`, category);
  }
}
