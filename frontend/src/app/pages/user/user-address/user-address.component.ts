import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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

Swal.fire({
  title: 'Are you sure?',
  text: 'You Want To Delete Address!',
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!',
}).then((result) => {
  if (result.isConfirmed) {
    this.userService.deleteAddress(address_id).subscribe(
      (data) => {
        location.reload();
        Swal.fire('Address deleted successfully!', '', 'success');
        this.userService.cartStatus.next(true);
      },
      (error) => {
        this.snack.open("You can't delete this address rigth now.Already order is pending on same address.", 'OK');
      }
    );
      
 
  }
});

    
  }

}
