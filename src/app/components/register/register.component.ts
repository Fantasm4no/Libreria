import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa AngularFirestore
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ErrorFirebaseService } from '../../services/error-firebase.service';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    imports: [RouterLink, ReactiveFormsModule, CommonModule]
})
export class RegisterComponent implements OnInit {
  registrarUsuario: FormGroup;   

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore, // Inyecta AngularFirestore
    private toastr: ToastrService,
    private router: Router,
    private errorfirebase: ErrorFirebaseService,
    private usersService: UsersService
  ) {
    this.registrarUsuario = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', Validators.required],
      role: [''] // Añade 'role' si es necesario
    });
  }

  ngOnInit(): void {}

  registrar() {
    const nombre = this.registrarUsuario.value.nombre;
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;
    const role = this.registrarUsuario.value.role;

    if (password !== repetirPassword) {
      this.toastr.error('Las contraseñas no coinciden', 'Error');
      return;
    }

    this.afAuth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        user.updateProfile({
          displayName: nombre
        }).then(() => {
          // Guardar los datos del usuario en Firestore
          this.afs.collection('users').doc(user.uid).set({
            uid: user.uid,
            nombre: nombre,
            email: email,
            role: role || 'users' // Guarda el rol si está definido, de lo contrario, 'user'
          }).then(() => {
            this.toastr.success('Usuario registrado y guardado en Firestore', 'Éxito');
            this.verificarCorreo();
          }).catch((error) => {
            console.log(error);
            this.toastr.error(this.errorfirebase.codeError(error.code), 'Error');
          });

          this.usersService.displayName = userCredential.user?.displayName;
          this.usersService.password = password
          console.log(userCredential.user?.displayName);
        }).catch((error) => {
          console.log(error);
          this.toastr.error(this.errorfirebase.codeError(error.code), 'Error');
        });
      }
    }).catch((error) => {
      console.log(error);
      this.toastr.error(this.errorfirebase.codeError(error.code), 'Error');
    });
  }

  withGoogle() {
    this.usersService.registrarConGoogle();
  }

  verificarCorreo() {
    this.afAuth.currentUser
      .then((user) => user?.sendEmailVerification())
      .then(() => {
        this.toastr.info(
          'Le enviamos un correo electrónico para su verificación',
          'Verificar correo'
        );
        this.router.navigate(['/login']);
      });
  }
}


