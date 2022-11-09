import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css'],
})
export class UpdateAddressComponent implements OnInit {
  address = {
    street: '',
    city: '',
    landmark: '',
    pincode: '',
    user:{
      id:0
    }
  }

  address_id=0;


  constructor(private userService:UserService,
              private route:ActivatedRoute,
              private snack:MatSnackBar,
              private loginService:LoginService,
              private router:Router) {}

  ngOnInit(): void {
    this.address_id= this.route.snapshot.params['address_id'];
    this.address.user.id=this.loginService.getUser().id;
    
    this.userService.getAddress(this.address_id).subscribe(
      (data:any)=>{
        this.address=data;
        console.log("Address: "+this.address.user);
      },
      (error)=>{
        this.snack.open('Unable to load address','OK');
      }
    )
  }

  updateAddress(){
    console.log(this.address)
    this.userService.updateAddress(this.address).subscribe(
      (data)=>{
        this.snack.open('Successfully Updated Address','OK')
        this.router.navigate(['/user-dashboard/address']);
      },
      (error)=>{
        this.snack.open('Unable to update  address','OK')
      }
    )
  }
}
