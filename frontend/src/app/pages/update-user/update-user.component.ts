import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  user = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    user_email: '',
    user_phone: '',
  };
  constructor(private snack:MatSnackBar,
              private userService:UserService,
              private route:ActivatedRoute,
              private loginService:LoginService,
              private router:Router) {}

  ngOnInit(): void {
      this.userService
        .getUser(this.loginService.getUser().id)
        .subscribe((data: any) => {
          console.log(data);
          this.user = data;
        });
  }

  updateUser() {
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('Username is required', 'ok');
      return;
    }
    if (this.user.username.length > 13 || this.user.username.length < 5) {
      this.snack.open(
        'Username length should be less than 13 character or greater than 5 character',
        'ok'
      );
      return;
    }

    if (this.user.password == '' || this.user.password == null) {
      this.snack.open('Password is required', 'ok');
      return;
    }
    if (this.user.first_name == '' || this.user.first_name == null) {
      this.snack.open('First name is required', 'ok');
      return;
    }
    if (this.user.last_name == '' || this.user.last_name == null) {
      this.snack.open('Last name is required', 'ok');
      return;
    }
    if (this.user.user_email == '' || this.user.user_email == null) {
      this.snack.open('Email is required', 'ok');
      return;
    }
    if (this.user.user_phone == '' || this.user.user_phone == null) {
      this.snack.open('Phone is required', 'ok');
      return;
    }
    this.userService.updateUser(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Updated successful !',
          showConfirmButton: false,
          timer: 2500,
        });

        if(this.loginService.isAdmin()){
          this.userService.userStatus.next(true);
          this.router.navigate(['/admin/profile']);
        }
          if(this.loginService.isNormal()){
            this.userService.userStatus.next(true);
            this.router.navigate(['/user-dashboard/profile'])
          }
        
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error !',
          text: 'Something went wrong!',
        });
      }
    );
  }
}
