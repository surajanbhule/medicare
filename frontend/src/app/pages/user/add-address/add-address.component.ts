import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
   
  address={
    street:'',
    city:'',
    landmark:'',
    pincode:'',
    user:{
      id:0
    }
  }
  constructor(private loginService:LoginService,
              private userService:UserService,
              private snack:MatSnackBar,
              private router:Router,
              private cartDialog:MatDialog) { }

  ngOnInit(): void {
     this.address.user.id=this.loginService.getUser().id;

  }

  addAddress(){
    this.userService.addAddress(this.address).subscribe(
      (data)=>{
        this.snack.open('Address added successfully','OK');
        if(this.userService.orderStatus){
          this.userService.orderStatus=false;
           this.cartDialog.open(OrderComponent, {
             height: '600px',
             width: '1200px',
           });
        }else{
        this.router.navigate(['/user-dashboard/address']);
        }
      },
      (error)=>{
        this.snack.open('Error','OK')
      }
    )
  }

}
