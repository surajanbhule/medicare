import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { ViewCartComponent } from '../user/view-cart/view-cart.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit{
  products: any = [];
  categories: any = [];
  cart_products: any = [];
  cat_id = 0;
  cart_id = 0;
  productImages: any = [];
  position = 0;
  max = 0;
  prev_btn = false;
  next_btn = false;
 

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public product: any,
    private cartDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productImages = this.product.productImages;
    this.max = this.productImages.length;
    this.userService.getCart(this.loginService.getUser().id).subscribe(
      (data: any) => {
        this.cart_id = data.id;
        console.log('Cart ID' + this.cart_id);
      },
      (error) => console.log(error)
    );

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

  prev() {
    if (this.position == 0) {
      this.prev_btn = true;
      return;
    }
    this.next_btn = false;
    this.position--;
  }

  next() {
    if (this.position == this.max - 1) {
      this.next_btn = true;

      return;
    }
    this.prev_btn = false;
    this.position++;
  }

  changePosition(n:any){
    this.position=n;
  }
}


