import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookserviceService } from '../../services/bookservice.service';
import { Books } from '../../domain/books';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizar-libros',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './actualizar-libros.component.html',
  styleUrl: './actualizar-libros.component.css'
})
export class ActualizarLibrosComponent {

  books : any
  book : Books = new Books();

  constructor(private bookService: BookserviceService){}

  ngOnInit(){
    this.bookService.getBooks().then(data => {
      this.books = data.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
    })
  }

  updateBook(book: Books) {
    this.bookService.updateBook(book.id, {
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      portada: book.portada
    }).then(() => {
      console.log('Libro actualizado');
      // Aquí puedes hacer cualquier acción adicional después de actualizar el libro
    }).catch(error => {
      console.error('Error actualizando libro: ', error);
    });
  }

}
