import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {
  address:any=[]

  constructor(private userService:UserService,
              private loginService:LoginService,
              private snack:MatSnackBar) { }

  ngOnInit(): void {

    this.userService.getAddressesOfUser(this.loginService.getUser().id).subscribe(
      (data)=>{
        this.address= data;
      },
      (error)=>{
        this.snack.open('Unable load addresses','OK')
      }
    )
  }

  deleteAddress(address_id:any){
    this.userService.deleteAddress(address_id).subscribe(
      (data)=>{
        this.snack.open('Address deleted successfully','OK');
        location.reload();
      },
      (error)=>{
        this.snack.open('Address not deleted', 'OK');
      }
    )
  }

}
