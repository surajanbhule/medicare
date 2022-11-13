import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
    password:''
  }

  constructor(private snackbar:MatSnackBar,
              private loginService:LoginService,
              private route:Router,
              private userService:UserService) { }

  ngOnInit(): void {
  }

  loginUser(){
    
    if(this.loginData.username=='' || this.loginData.username==null){
      this.snackbar.open("Username is required","Ok");
      return
    }

      if (this.loginData.password == '' || this.loginData.password == null) {
        this.snackbar.open('Password is required', 'Ok');
        return
      }

      this.loginService.generateToken(this.loginData).subscribe(
        (data:any)=>{
          console.log('success');
          console.log(data);
          this.loginService.loginUser(data.token);

          this.loginService.getCurrentUser().subscribe(
            (user)=>{
              this.loginService.setUser(user);
              console.log(user);

              if(this.loginService.getUserRole() =='ADMIN'){
                //this.route.navigate(['admin']);
                 location.href = "admin";
                this.loginService.loginStatusSubject.next(true);
              }else if(this.loginService.getUserRole() == 'NORMAL'){
                
                //  this.route.navigate(['']);
                 location.href="";
                 this.loginService.loginStatusSubject.next(true);
                 this.userService.cartStatus.next(true);
                    
              }else{
                this.loginService.logout();
                location.reload();
              }
            },
            (error)=>{
              Swal.fire({
                icon: 'error',
                title: 'Invalid Username or Password',
                text: 'If you are new ? .. Register',
              });
            }
          )
        },
        (error)=>{
          
           Swal.fire({
             icon: 'error',
             title: 'Invalid Username or Password',
             text: 'If you are new ? .. Register',
           });
        }
      )
  }

}
