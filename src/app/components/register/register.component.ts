import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { GoogleAuthProvider } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ErrorFirebaseService } from '../../services/error-firebase.service';


@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [RouterLink, ReactiveFormsModule,CommonModule]
})
export class RegisterComponent implements OnInit{

  registrarUsuario: FormGroup;
  

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,private router: Router, 
    private errorfirebase:ErrorFirebaseService){
    this.registrarUsuario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      repetirPassword: ['', Validators.required]
    })
  }

  ngOnInit():void{

  }

  registrar(){
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;

    if(password !== repetirPassword){
      this.toastr.error('Las contraseñas no coinciden','Error');
      return;
    }
    
    
    this.afAuth.createUserWithEmailAndPassword(email, password).then((user)=>{
      
      this.toastr.success('El usuario se registro con exito','Registro exitoso' )
      this.router.navigate(['/login'])
      console.log(user);
    }).catch((error)=>{
      console.log(error)
      this.toastr.error(this.errorfirebase.codeError(error.code), 'Error');
    })
  }

  

  registrarConGoogle(){
    this.afAuth.signInWithPopup(new GoogleAuthProvider()).then((result)=>{
      console.log('Iniciar sesión con Google exitoso:', result);
    }).catch((error) => {
      console.error('Error Inicio de sesión con Google:', error);
    });
  }
}
