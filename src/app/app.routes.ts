import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecuperarPswrdComponent } from './components/recuperar-pswrd/recuperar-pswrd.component';
import { AnadirLibrosComponent } from './components/anadir-libros/anadir-libros.component';
import { ActualizarLibrosComponent } from './components/actualizar-libros/actualizar-libros.component';
import { EliminarLibrosComponent } from './components/eliminar-libros/eliminar-libros.component';
import { VerificarComponent } from './components/verificar/verificar.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'recuperar-pswrd', component: RecuperarPswrdComponent },
  { path: 'anadir', component: AnadirLibrosComponent },
  { path: 'actualizar', component: ActualizarLibrosComponent}, 
  { path: 'eliminar', component: EliminarLibrosComponent}, 
  { path: 'verificar', component: VerificarComponent },
  {path: 'usuarios',component:AdminUsersComponent}
];




