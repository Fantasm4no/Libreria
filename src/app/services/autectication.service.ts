import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//import { UserInterface } from '../domain/roles';
import { Firestore } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';




@Injectable({
  providedIn: 'root'
})
export class AutecticationService {
  user: any
  email: any

  constructor(private afAuth: AngularFireAuth, private router: Router, private authfirebase: AngularFireAuth,
     private toastr:ToastrService, private afs: AngularFirestore) { }


     logout() {
      this.afAuth.signOut().then(() => {
        console.log('Sesión cerrada correctamente');
        // Limpiar variables de usuario
        this.user = null;
        this.email = null;
        // Redirigir a la página de inicio de sesión u otra página deseada
        this.router.navigate(['/login']);
      }).catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
    }

    




}
