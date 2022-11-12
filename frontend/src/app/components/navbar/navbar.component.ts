import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NotificationComponent } from 'src/app/pages/user/notification/notification.component';
import { ViewCartComponent } from 'src/app/pages/user/view-cart/view-cart.component';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';
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
  notifications: any = null;
  cartOpen = false;
  msgOpen = false;
  search = '';

  products_in_cart = 0;
  constructor(
    public loginService: LoginService,
    private router: Router,
    private userService: UserService,
    private cartDialog: MatDialog,
    private productService:ProductService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
    this.isAdmin = this.loginService.isAdmin();
    this.isNormal = this.loginService.isNormal();

    this.userService
      .getNotifications(this.loginService.getUser().id)
      .subscribe((data: any) => {
        this.notifications = data;
      });

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
      this.userService
        .getNotifications(this.loginService.getUser().id)
        .subscribe((data: any) => {
          this.notifications = data;
        });
    });

    this.userService.getCart(this.user.id).subscribe((data: any) => {
      this.products_in_cart = data.products.length;
      console.log(this.products_in_cart);
    });

    this.userService.userStatus.asObservable().subscribe((data) => {
      this.userService
        .getUser(this.loginService.getUser().id)
        .subscribe((data: any) => {
          console.log(data);
          this.user = data;
        });

      this.userService
        .getNotifications(this.loginService.getUser().id)
        .subscribe((data: any) => {
          this.notifications = data;
        });
    });

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

  public showCart() {
    this.cartOpen = true;
    const dialogREf = this.cartDialog.open(ViewCartComponent, {
      height: '450px',
      width: '1000px',
      position: {
        right: '0',
        top: '0',
      },
    });

    dialogREf.afterClosed().subscribe((data) => {
      this.cartOpen = false;
    });
  }

  openNotifications() {
    this.msgOpen = true;
    const ref = this.cartDialog.open(NotificationComponent, {
      height: '450px',
      width: '450px',
      position: {
        right: '0',
        top: '0',
      },
    });

    ref.afterClosed().subscribe((data) => {
      this.msgOpen = false;
    });
  }

  searchProducts(){
    if(this.search.length == 0){
      this.router.navigate(['/home/0']);
    }else{
      this.router.navigate(['/search/'+this.search]);
    }
  }
}
