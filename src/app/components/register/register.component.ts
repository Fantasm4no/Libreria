import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ErrorFirebaseService } from '../../services/error-firebase.service';
import { UsersService } from '../../services/users.service';


@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [RouterLink, ReactiveFormsModule,CommonModule]
})
export class RegisterComponent implements OnInit{

  registrarUsuario: FormGroup;
  email:any
  

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,private router: Router, 
    private errorfirebase:ErrorFirebaseService,
    private usersService : UsersService){
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
      this.email = user.user?.email
      console.log(user.user?.emailVerified);
    }).catch((error)=>{
      console.log(error)
      this.toastr.error(this.errorfirebase.codeError(error.code), 'Error');
    })
  }

  withGoogle(){
    this.usersService.registrarConGoogle();
  }
}
