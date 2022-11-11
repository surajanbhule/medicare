import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { ViewCartComponent } from '../user/view-cart/view-cart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any = [];
  categories: any = [];
  cart_products: any = [];
  cat_id = 0;
  cart_id = 0;

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService,
    private cartDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.getCart(this.loginService.getUser().id).subscribe(
      (data: any) => {
        this.cart_id = data.id;
        console.log('Cart ID' + this.cart_id);
      },
      (error) => console.log(error)
    );

    this.productService.getPopularCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        this.snack.open('Unable to load categories data', 'OK');
      }
    );

    if (this.cat_id == undefined) {
      this.cat_id = 0;
    }

    this.cat_id = this.route.snapshot.params['cat_id'];

    if (this.cat_id == 0) {
      this.productService.getProducts().subscribe(
        (data) => {
          this.products = data;

          for (let p of this.products) {
            p = this.imageProcessingService.createProductImages(p);
          }
        },
        (error) => {
          this.snack.open('unable to load product data', 'OK');
        }
      );
    } else if (this.cat_id > 0) {
      this.productService.getProductsByCategory(this.cat_id).subscribe(
        (data) => {
          this.products = data;

          for (let p of this.products) {
            p = this.imageProcessingService.createProductImages(p);
          }
        },
        (error) => {
          this.snack.open('unable to load product data', 'OK');
        }
      );
    }

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.cat_id = this.route.snapshot.params['cat_id'];

        if (this.cat_id == 0) {
          this.productService.getProducts().subscribe(
            (data) => {
              this.products = data;

              for (let p of this.products) {
                p = this.imageProcessingService.createProductImages(p);
              }
            },
            (error) => {
              this.snack.open('unable to load product data', 'OK');
            }
          );
        } else if (this.cat_id > 0) {
          this.productService.getProductsByCategory(this.cat_id).subscribe(
            (data) => {
              this.products = data;

              for (let p of this.products) {
                p = this.imageProcessingService.createProductImages(p);
              }
            },
            (error) => {
              this.snack.open('unable to load product data', 'OK');
            }
          );
        }
      }
    });

    this.userService
      .getCart(this.loginService.getUser().id)
      .subscribe((data: any) => {
        this.cart_products = data.products;
        console.log(this.cart_products);
      });

    this.userService.cartStatus.asObservable().subscribe((data) => {
      this.userService
        .getCart(this.loginService.getUser().id)
        .subscribe((data: any) => {
          this.cart_products = data.products;
          console.log(this.cart_products);
        });
    });

    console.log(this.cart_products);
  }

  public addToCart(product: any) {
    if (!this.loginService.isLoggedIn()) {
      this.snack.open('You must login to add product to cart', 'OK');
      return;
    }

    if (this.loginService.getUserRole() == 'NORMAL') {
      const user_id = this.loginService.getUser().id;
      console.log('User ID' + user_id);
      this.userService.getCart(user_id).subscribe(
        (data: any) => {
          this.cart_id = data.id;
          console.log('Cart ID' + this.cart_id);
          this.userService.cartStatus.next(true);
        },
        (error) => console.log(error)
      );

      this.userService.addProductToCart(this.cart_id, product).subscribe(
        (data) => {
          this.snack.open('Product added to cart', 'OK');
          this.userService.cartStatus.next(true);

          this.userService
            .getCart(this.loginService.getUser().id)
            .subscribe((data: any) => {
              this.cart_products = data.products;
            });
        },
        (error) => {
          this.snack.open('Product not added to cart', 'OK');
        }
      );
    } else if (this.loginService.getUserRole() == 'ADMIN') {
      this.snack.open('This service is for normal user only', 'OK');
    }
  }

  public productInCart(product_id: any) {
    let result = false;

    for (let p of this.cart_products) {
      if (p.id == product_id) {
        result = true;
      }
    }

    return result;
  }

  gotoCart() {
      this.cartDialog.open(ViewCartComponent, {
        height: '500px',
        width: '900px',
        position: {
          right: '0',
          top: '0',
        },
      });
  }
}
