import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorFirebaseService } from '../../services/error-firebase.service';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginUsuario: FormGroup;
  user: any

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,private router: Router,
     private errorFirebase: ErrorFirebaseService,
      private usersService : UsersService) {
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
      if(user.user?.emailVerified){
        this.usersService.email = user.user.email
        this.usersService.displayName = user.user.displayName
        this.usersService.password = password
        this.router.navigate(['dashboard'])
      }else{
        this.router.navigate(['/verificar'])
      };
    }).catch((error) => {
      this.toastr.error(this.errorFirebase.codeError(error.code),'  Error');
    }) 
  }

  withGoogle(){
    this.usersService.registrarConGoogle();
  }

}
