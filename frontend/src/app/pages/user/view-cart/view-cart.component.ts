import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { OrderComponent } from '../order/order.component';


@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css'],
})
export class ViewCartComponent implements OnInit {
  displayedColumns: string[] = [
    'image',
    'name',
    'price',
    'discount',
    'payable',
    'quantity',
    'action',
  ];

  resultColumns: string[] = ['price', 'saved', 'payable', 'action'];
  products_in_cart: any = [];
  quantity = 1;
  cart_id = 0;

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private snack: MatSnackBar,
    private imageProcessingService: ImageProcessingService,
    private cartDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService
      .getCart(this.loginService.getUser().id)
      .subscribe((data: any) => {
        this.products_in_cart = data.products;
        this.cart_id = data.id;
        for (let p of this.products_in_cart) {
          p = this.imageProcessingService.createProductImages(p);
        }
        console.log(this.products_in_cart);
      });

    this.userService.cartStatus.asObservable().subscribe((event) => {
      this.userService
        .getCart(this.loginService.getUser().id)
        .subscribe((data: any) => {
          this.products_in_cart = data.products;
          this.cart_id = data.id;
          for (let p of this.products_in_cart) {
            p = this.imageProcessingService.createProductImages(p);
          }
          console.log(this.products_in_cart);
        });
    });
  }

  addQuantity() {
    this.quantity++;
  }

  subtractQuantity() {
    this.quantity--;
  }

  delete(product_id: any) {
    this.userService.deleteProductFromCart(this.cart_id, product_id).subscribe(
      (data: any) => {
        this.userService.cartStatus.next(true);
      },
      (error) => {
        alert('Item Not Removed');
      }
    );
  }

  openOrder() {
    console.log(this.getTotalCost());
    if(this.products_in_cart.length>0){
    this.cartDialog.open(OrderComponent, {
      data:this.getTotalCost(),
      height: '600px',
      width: '1200px',
    });
  }else{
    this.snack.open('No products in cart','OK');
  }
  }

  getTotalCost(){
    let total=0;
    for(let p of this.products_in_cart){
      total= total + p.product_selling_price;
    }
    return total;
  }
}
