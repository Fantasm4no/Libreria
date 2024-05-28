import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorFirebaseService } from '../../services/error-firebase.service';

@Component({
  selector: 'app-recuperar-pswrd',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './recuperar-pswrd.component.html',
  styleUrls: ['./recuperar-pswrd.component.css']
})
export class RecuperarPswrdComponent {
  recuperarUsuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private errorFirebase: ErrorFirebaseService
  ) {
    this.recuperarUsuario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  recuperar(): void {
    const email = this.recuperarUsuario.value.correo;

    this.afAuth.sendPasswordResetEmail(email).then(() => {
      this.toastr.info('Se le acaba de enviar un correo para restablecer su contraseña', 'Recuperar password');
      this.router.navigate(['/login']);
      return;
    }).catch((error) => {
        this.toastr.error(this.errorFirebase.codeError(error.code),'Error')
    });
  }
}

