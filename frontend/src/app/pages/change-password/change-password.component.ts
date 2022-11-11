import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  current_password: string = '';
  new_password:string = '';
  confirm_password:string = '';
  status= true;
  user:any={
    password:''
  };
  check_current_password:any=true;

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private snack:MatSnackBar,
    private router:Router
  ) {}

  ngOnInit(): void {

    this.userService.getUser(this.loginService.getUser().id).subscribe(
      (data)=>{
        this.user=data;
      }
    )

  }

  compare() {
    if( this.new_password.substring(0,this.confirm_password.length ) == this.confirm_password  ){
      this.status=true;
    }else{
      this.status = false;
    }
  }

  changePassword() {

    if(!this.status){
      this.snack.open('Confirm Password and New Password must same','OK');
      return;
    }

    this.user = this.loginService.getUser();
    this.user.password= this.current_password;
    this.userService.confirmPassword(this.user).subscribe(
      (data)=>{
        this.check_current_password = data;
        console.log(this.check_current_password);
      }
    )
    
      if(this.check_current_password){
        
        this.user.password=this.confirm_password;

        this.userService.changePassword(this.user).subscribe(
          (data)=>{
            this.snack.open('Password changed successfully', 'OK');
            this.router.navigate(['/login']);
            this.loginService.logout();
          }
        )


      }else{
        this.snack.open('Current password is not correct','OK')
      }
  }
}
