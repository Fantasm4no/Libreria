import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FormsModule } from '@angular/forms';
import { Users } from '../../domain/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent implements OnInit {

  user: Users = new Users();
  users: any;
  displayName: string;
  photoURL: string;
  email: string;

  constructor(private userService: UsersService) {
    this.displayName = this.userService.displayName;
    this.photoURL = this.userService.phtoURL;
    this.email = this.userService.email;
  }

  ngOnInit(){
    this.userService.getUsers().then(data => {
      this.users = data.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const photoURL = reader.result as string;
        if (photoURL) {
          this.user.photoURL = photoURL;
        }
      };
    }
  }

  anadir(){
    this.userService.addUsers(this.user);
  }

  borrar(userId : string){
    this.userService.deleteUsers(userId).then(() => {
      console.log('Usuario eliminado exitosamente');
    }).catch(error => {
      console.log('Error al eliminar usuario:', error);
    })
  }

  acciones(attribute: any) {
    this.borrar(attribute);
    this.anadir();
  }
  
}
