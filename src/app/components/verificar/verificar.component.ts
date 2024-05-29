import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verificar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './verificar.component.html',
  styleUrl: './verificar.component.css'
})
export class VerificarComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
  }
}
