import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ViewCartComponent } from 'src/app/pages/user/view-cart/view-cart.component';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  isNormal = false;
  user: any = null;

  products_in_cart = 0;
  constructor(
    public loginService: LoginService,
    private router: Router,
    private userService: UserService,
    private cartDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
    this.isAdmin = this.loginService.isAdmin();
    this.isNormal = this.loginService.isNormal();

    this.loginService.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.loginService.isLoggedIn();
       this.userService
         .getUser(this.loginService.getUser().id)
         .subscribe((data: any) => {
           console.log(data);
           this.user = data;
         });
      this.isAdmin = this.loginService.isAdmin();
      this.isNormal = this.loginService.isNormal();
    });

    this.userService.getCart(this.user.id).subscribe((data: any) => {
      this.products_in_cart = data.products.length;
      console.log(this.products_in_cart);
    });

    this.userService.userStatus.asObservable().subscribe(
      (data)=>{
         this.userService
           .getUser(this.loginService.getUser().id)
           .subscribe((data: any) => {
             console.log(data);
             this.user = data;
           });
      }
    )

    this.userService.cartStatus.asObservable().subscribe((data: any) => {
      this.userService.getCart(this.user.id).subscribe((data: any) => {
        this.products_in_cart = data.products.length;
        console.log(this.products_in_cart);
      });
    }); 
  }

  logout() {
    this.loginService.logout();
    window.location.reload();
  }

  openDashboard() {
    if (this.loginService.getUserRole() == 'ADMIN') {
      this.router.navigate(['admin']);
    }

    if (this.loginService.getUserRole() == 'NORMAL') {
      this.router.navigate(['/user-dashboard']);
    }
  }

 public showCart(){
        this.cartDialog.open(ViewCartComponent, {
          height: '450px',
          width:  '1000px',
          position:{
            right:'0',
            top:'0',  
          },
          

        });
  }
}
