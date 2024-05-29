import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookserviceService } from '../../services/bookservice.service';

@Component({
  selector: 'app-eliminar-libros',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './eliminar-libros.component.html',
  styleUrl: './eliminar-libros.component.css'
})
export class EliminarLibrosComponent {

  books : any

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

  borrar(bookId: string){
    this.bookService.deleteBooks(bookId).then(()=>{
      console.log('Documento eliminado exitosamente');
    }).catch(error => {
      console.log('Error al eliminar documento:', error);
    });
  }
}
