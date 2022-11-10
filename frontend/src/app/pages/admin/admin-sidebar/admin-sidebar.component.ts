import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
})
export class AdminSidebarComponent implements OnInit {
  orders:any=[]
  constructor(private loginService:LoginService,
              private userService:UserService) {}

  ngOnInit(): void {
    
     this.userService.getPendingOrder().subscribe(
      (data:any)=>{ this.orders = data; })
  }

  logout() {
    this.loginService.logout();
    window.location.reload();
  }
}
