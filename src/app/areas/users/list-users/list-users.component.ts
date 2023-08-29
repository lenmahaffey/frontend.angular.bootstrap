import { Component, Injectable } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/api/api.models';

@Component({
  selector: 'app-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})

export class ListUsersComponent {

  users = []
  displayedColumns: string[] = ['id', 'firstname', 'lastname'];
  data:User[] = []
  constructor(private api: UsersService, private router: Router)
  {
    this.api.ListAllUsers().subscribe(data =>
      {
        this.data = data
      })
  }

  view(user: any){
    this.router.navigate(['/users/edituser', user.id])
  }
}
