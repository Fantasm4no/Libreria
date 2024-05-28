import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorFirebaseService } from '../../services/error-firebase.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginUsuario: FormGroup;

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,private router: Router,
     private errorFirebase: ErrorFirebaseService) {
      this.loginUsuario=this.fb.group({
        email: ['', Validators.required],
        password: ['',Validators.required],
      })
    }

  ngOnInit(): void {

  }
  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;

    this.afAuth.signInWithEmailAndPassword(email,password).then((user)=> {
      console.log(user);
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      this.toastr.error(this.errorFirebase.codeError(error.code),'  Error');
    })

    
  }

}
