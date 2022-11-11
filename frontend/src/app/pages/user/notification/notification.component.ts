import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications:any=null;

  constructor(private userService:UserService,
              private loginService:LoginService) { }

  ngOnInit(): void {
    this.userService.getNotifications(this.loginService.getUser().id).subscribe(
      (data)=>{
        this.notifications=data;
      }
    )
  }

}
