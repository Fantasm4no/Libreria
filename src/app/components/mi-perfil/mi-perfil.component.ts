import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent {

  displayName: any
  photoURL: any
  email: any
  phone:any
  biography:any

  constructor(private userService: UsersService){
    this.displayName = this.userService.displayName
    this.photoURL = this.userService.phtoURL
    this.email = this.userService.email
  }

}
