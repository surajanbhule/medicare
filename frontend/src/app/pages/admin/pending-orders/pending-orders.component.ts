import { Component, OnInit } from '@angular/core';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css'],
})
export class PendingOrdersComponent implements OnInit {
  orders: any = [];
  products: any = [];
  user: any = {};
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private imageService: ImageProcessingService
  ) {}

  ngOnInit(): void {

    this.userService.getPendingOrder().subscribe((data: any) => {
      this.orders = data;

      for (let o of this.orders) {
        this.userService.getOrderProducts(o.id).subscribe((data) => {
          this.products = data;

          for (let p of this.products) {
            p = this.imageService.createProductImages(p);
          }
          o.product_list = this.products;
        });
      }

      console.log(this.orders);
    });

    this.userService.cartStatus.asObservable().subscribe(
      (data)=>{
             this.userService.getPendingOrder().subscribe((data: any) => {
               this.orders = data;

               for (let o of this.orders) {
                 this.userService.getOrderProducts(o.id).subscribe((data) => {
                   this.products = data;

                   for (let p of this.products) {
                     p = this.imageService.createProductImages(p);
                   }
                   o.product_list = this.products;
                 });
               }

               console.log(this.orders);
             });
      }
    )
  }

  completeOrder(order_id:any){


Swal.fire({
  title: 'Are you sure?',
  text: "You Want Confirm This Order!",
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, confirm it!',
}).then((result) => {
  if (result.isConfirmed) {
    this.userService.completeOrder(order_id).subscribe((data) => {

      Swal.fire('Order Completed!','','success');
      this.userService.cartStatus.next(true);
    });
  }
});

    
  }

}
