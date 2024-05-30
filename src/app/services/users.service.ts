import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Users } from '../domain/user';
import { Firestore, addDoc } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  displayName: any
  email: any
  phtoURL: any

  constructor(private afAuth: AngularFireAuth, private router: Router, private authfirebase: AngularFireAuth, private toastr:ToastrService, private firestore: Firestore,private afs: AngularFirestore) { }

  registrarConGoogle(){
    this.afAuth.signInWithPopup(new GoogleAuthProvider()).then((result)=>{
      console.log('Iniciar sesión con Google exitoso:', result);
      this.router.navigate(['/dashboard'])
      this.displayName = result.user?.displayName
      this.email = result.user?.email
      this.phtoURL = result.user?.photoURL
      console.log(this.displayName, this.email, this.phtoURL)
    }).catch((error) => {
      console.error('Error Inicio de sesión con Google:', error);
    });
  }
  
  addUsers(user: Users) {
    return addDoc(collection(this.firestore, 'usuarios'), Object.assign({}, user));
  }


}
