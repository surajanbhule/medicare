import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
})
export class ViewUsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'user_role', 'email','phone'];
  public users: any = [];
  dataSource:any = [];

  constructor(private userService: UserService, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        this.snack.open('Unable to load users', 'OK');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.users.filter = filterValue.trim().toLowerCase();
  }
}




