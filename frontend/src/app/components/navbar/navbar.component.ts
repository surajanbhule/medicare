import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn=false;
  isAdmin=false;
  isNormal=false;
  user:any=null
  constructor(public loginService:LoginService,
              private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
    
     
    this.loginService.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn = this.loginService.isLoggedIn();
      this.user = this.loginService.getUser(); 
    })
  }

  logout(){
    this.loginService.logout();
    window.location.reload();
  }

  openDashboard(){
    if(this.loginService.getUserRole() == 'ADMIN'){
      this.router.navigate(['admin'])
    }

    if(this.loginService.getUserRole() == 'NORMAL'){
      this.router.navigate(['/user-dashboard'])
    }
  }

}
