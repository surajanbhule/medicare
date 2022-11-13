import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  order = {
    payment_status: '',
    total:0,
    user: {
      id: 0,
    },
    address: {
      id: 0,
    },
  };
  cart_id = 0;
  address: any = [];
  address_id: any;
  payment_id: any;
  payment_status = '';
  payment_status_done = false;
  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  secondFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private snack: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public total_bill: any,
  ) {}

  ngOnInit(): void {

    console.log(this.total_bill);


    this.userService.getCart(this.loginService.getUser().id).subscribe(
      (data: any) => {
        console.log(data.id);
        this.cart_id = data.id;
        console.log('cart_id' + this.cart_id);
      },
      (error) => {
        this.snack.open('Cart Not Getting');
      }
    );

    this.userService
      .getAddressesOfUser(this.loginService.getUser().id)
      .subscribe(
        (data) => {
          this.address = data;
        },
        (error) => {
          this.snack.open('Unable load addresses', 'OK');
        }
      );
  }

  deleteAddress(address_id: any) {
    this.userService.deleteAddress(address_id).subscribe(
      (data) => {
        this.snack.open('Address deleted successfully', 'OK');
        location.reload();
      },
      (error) => {
        this.snack.open('Address not deleted', 'OK');
      }
    );
  }

  addAddress() {
    this.userService.orderStatus = true;
    this.router.navigate(['/user-dashboard/add-address']);
  }

  updateAddress(address_id: any) {
    this.userService.orderStatus = true;
    this.router.navigate(['/user-dashboard/update-address/' + address_id]);
  }

  addressChanged(id: any) {
    this.address_id = id;
  }

  paymentDone(id: number) {
    if (id == 1) {
      this.payment_status = 'Cash on delivery';
    }

    if (id == 2) {
      this.payment_status = 'Card Payment';
    }

    if (id == 3) {
      this.payment_status = 'Upi Payment';
    }
  }

  placeOrder() {
    console.log(this.payment_status);
    this.order.payment_status = this.payment_status;
    this.order.total= this.total_bill;
    if (this.order.payment_status == '') {
      this.snack.open('Payment Not Done Yet', 'OK');
      return;
    }
    if (this.address_id == undefined) {
      this.snack.open('Address No Selected Yet', 'OK');
      return;
    }

    this.order.address.id = this.address_id;

    this.order.user.id = this.loginService.getUser().id;
    this.userService.createOrder(this.order).subscribe(
      (data) => {
        

        this.userService.deleteProductsFromCart(this.cart_id).subscribe(
          (data) => {
            
            this.userService.cartStatus.next(true);
          },
          (error) => {
            this.snack.open('Cart Not Cleared', 'OK');
          }
        );
      },
      (error) => {
        this.snack.open('Order not placed','ok');
      }
    );
  }
}
