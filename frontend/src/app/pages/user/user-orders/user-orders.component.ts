import { Component, OnInit } from '@angular/core';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  orders:any=[]
  products:any=[]
  constructor(private userService:UserService,
              private loginService:LoginService,
              private imageService:ImageProcessingService) { }

  ngOnInit(): void {

    this.userService.getOrders(this.loginService.getUser().id).subscribe(
      (data:any)=>{ this.orders = data; 
      
        for(let o of this.orders){
           this.userService.getOrderProducts(o.id).subscribe(
            (data)=>{

              this.products = data;
               
              for(let p of this.products){
                p = this.imageService.createProductImages(p);
              }
                o.product_list = this.products;
            }
           )
        }

        
        console.log(this.orders);
      
      } );

    
  }

}
