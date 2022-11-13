import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ViewCartComponent } from '../user/view-cart/view-cart.component';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css'],
})
export class SearchProductComponent implements OnInit {
  products: any = [];
  rel_products: any = [];
  cart_products: any = [];
  search_model = '';
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

    

    this.search_model = this.route.snapshot.params['model'];

    this.productService.searchProductsStartWith(this.search_model).subscribe(
      (data) => {
        this.products = data;
        for (let p of this.products) {
          p = this.imageProcessingService.createProductImages(p);
        }
      },
      (error) => {}
    );

      this.productService.searchProducts(this.search_model).subscribe(
        (data) => {
          this.rel_products = data;
          for (let p of this.rel_products) {
            p = this.imageProcessingService.createProductImages(p);
          }
        },
        (error) => {}
      );

    this.productService.searchStatus.asObservable().subscribe((data) => {
      this.productService.searchProductsStartWith(this.search_model).subscribe(
        (data) => {
          this.products = data;
          for (let p of this.products) {
            p = this.imageProcessingService.createProductImages(p);
          }
        },
        (error) => {}
      );

      this.productService.searchProducts(this.search_model).subscribe(
        (data) => {
          this.rel_products = data;
          for (let p of this.rel_products) {
            p = this.imageProcessingService.createProductImages(p);
          }
        },
        (error) => {}
      );
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

    this.userService.getCart(this.loginService.getUser().id).subscribe(
      (data: any) => {
        this.cart_id = data.id;
        console.log('Cart ID' + this.cart_id);
      },
      (error) => console.log(error)
    );

    console.log(this.cart_products);
  }

  showDetails(product: any) {
    this.cartDialog.open(ProductDetailsComponent, {
      height: '900px',
      width: '900px',
      data: product,
      position: {
        top: '50px',
      },
    });
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
