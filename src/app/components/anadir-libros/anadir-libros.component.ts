import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookserviceService } from '../../services/bookservice.service';
import { Books } from '../../domain/books';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anadir-libros',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './anadir-libros.component.html',
  styleUrl: './anadir-libros.component.css'
})
export class AnadirLibrosComponent {

  book: Books = new Books()

  constructor(private bookService: BookserviceService){}

  anadir(){
    this.bookService.addBooks(this.book)
  }
}
