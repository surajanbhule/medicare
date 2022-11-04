import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

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
              private route:Router) { }

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
                
                this.route.navigate(['admin']);
                this.loginService.loginStatusSubject.next(true);
              }else if(this.loginService.getUserRole() == 'NORMAL'){
                
                 this.route.navigate(['user-dashboard']);
                 this.loginService.loginStatusSubject.next(true);
              }else{
                this.loginService.logout();
                location.reload();
              }
            },
            (error)=>{
              this.snackbar.open('Invalid Details, Try with correct details !!!')
            }
          )
        },
        (error)=>{
          console.log('error');
          console.log(error);
          this.snackbar.open('Invalid Details, Try with correct details !!!');
        }
      )
  }

}
