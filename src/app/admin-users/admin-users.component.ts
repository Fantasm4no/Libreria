import { Component } from '@angular/core';
import { User, UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  users: User[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  editUser(user: User): void {
    user.editing = true;
  }

  saveUser(user: User): void {
    user.editing = false;
    this.usersService.updateUserDetails(user.uid, user)
      .then(() => {
        console.log('Usuario actualizado:', user);
      })
      .catch(error => {
        console.error('Error al actualizar usuario:', error);
      });
  }

}
