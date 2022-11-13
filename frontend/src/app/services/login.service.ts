import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>()

  constructor(private http:HttpClient) { }

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`)
  }

  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  public loginUser(token:any){
    localStorage.setItem('token',token);
    
    return true;
  }

  public isLoggedIn(){
    let tokenstr= localStorage.getItem('token');
    if(tokenstr==undefined || tokenstr==''||tokenstr==null){
      return false;
    }else{
      return true;
    }
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUser(){
    let user = localStorage.getItem('user');
    if(user!=null){
      return JSON.parse(user)
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    if(user!=null){
    return user.authorities[0].authority;
    }
  }

  public isAdmin(){
    if(this.getUserRole() == 'ADMIN'){
      return true;
    }else{
      return false;
    }
  }

  public isNormal(){
    if (this.getUserRole() == 'NORMAL') {
      return true;
    } else {
      return false;
    }
  }
}
