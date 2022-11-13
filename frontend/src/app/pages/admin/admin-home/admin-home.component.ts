import { Component, OnInit } from '@angular/core';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  orders: any = [];
  products: any = [];
  public users: any = [];
  user: any = {};
  numberOfUser = 0;
  paymentRecieved = 0;
  pendingPayment = 0;
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private imageService: ImageProcessingService
  ) {}

  ngOnInit(): void {
    this.userService.getAllOrder().subscribe((data: any) => {
      this.orders = data;

      for (let o of this.orders) {
        this.userService.getOrderProducts(o.id).subscribe((data) => {
          this.products = data;
          if (o.payment_status != 'Cash on delivery') {
            this.paymentRecieved += o.total;
          }

          if (o.payment_status == 'Cash on delivery') {
            this.pendingPayment += o.total;
          }
          for (let p of this.products) {
            p = this.imageService.createProductImages(p);
          }
          o.product_list = this.products;
        });
      }

      this.userService.getUsers().subscribe(
        (data) => {
          this.users = data;
        },
        (error) => {
          
        }
      );

      console.log(this.orders);
    });
  }
}
