import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: any
  email: any

  constructor(private afAuth: AngularFireAuth, private router: Router, private authfirebase: AngularFireAuth, private toastr:ToastrService) { }

  registrarConGoogle(){
    this.afAuth.signInWithPopup(new GoogleAuthProvider()).then((result)=>{
      console.log('Iniciar sesión con Google exitoso:', result);
      this.router.navigate(['/dashboard']);
      this.user = result.user?.displayName
      this.email = result.user?.email
      console.log(this.user)
    }).catch((error) => {
      console.error('Error Inicio de sesión con Google:', error);
    });
  }
  
  
}
