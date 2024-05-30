import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../domain/roles'; // Importa la interfaz User desde roles.ts
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-mi-perfil',
  
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css'],
  standalone: true,
  imports: [FormsModule,RouterLink]
})
export class MiPerfilComponent implements OnInit {

  user: User = { uid: '', nombre: '', email: '', role: '', phone: '', biography: '' }; // Inicializa con todas las propiedades de User

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.getUserss().then(data => {
      const userData = data.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data()
        };
      })[0]; // Suponiendo que solo hay un usuario por ahora
      this.user = {
        uid: userData.uid,
        nombre: userData.nombre,
        email: userData.email,
        role: userData.role,
        phone: userData.phone, // Agregar propiedad
        biography: userData.biography // Agregar propiedad
      };
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const photoURL = reader.result as string;
      };
    }
  }

  guardarCambios() {
    this.userService.updateUserDetails(this.user.uid, this.user)
      .then(() => {
        console.log('Usuario actualizado correctamente en la base de datos');
      })
      .catch(error => {
        console.error('Error al actualizar usuario en la base de datos:', error);
      });
  }

  borrarUsuario() {
    this.userService.deleteUsers(this.user.uid).then(() => {
      console.log('Usuario eliminado exitosamente');
    }).catch(error => {
      console.error('Error al eliminar usuario:', error);
    });
  }
}






