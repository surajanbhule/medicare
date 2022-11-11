import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any=null;
  constructor(private loginService:LoginService,
              private userService:UserService) { }

  ngOnInit(): void {
   
     this.userService
       .getUser(this.loginService.getUser().id)
       .subscribe((data: any) => {
         console.log(data);
         console.log(this.loginService.getUser().id);
         this.user = data;
       });


    this.userService.userStatus.asObservable().subscribe(
      (data)=>{

        this.userService.getUser(this.loginService.getUser().id).subscribe(
          (data:any)=>{
            console.log(data);
            this.user=data;
          }
        )
      }
    )
  }

}
