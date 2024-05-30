import { Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './services/users.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'libreria';


}
