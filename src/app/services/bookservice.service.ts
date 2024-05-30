import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, query } from '@angular/fire/firestore';
import { Books } from '../domain/books';
import { updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {

  constructor(private http: HttpClient, private firestore: Firestore) { }

  searchBooks(query: string) {
    return this.http.get(`https://openlibrary.org/search.json?q=${query}`);
  }

  getBooksFromOpenLibrary() {
    return this.http.get('https://openlibrary.org/subjects/fiction.json?limit=8');
  }

  addBooks(book: Books) {
    return addDoc(collection(this.firestore, 'libros'), Object.assign({}, book));
  }

  getBooks() {
    return getDocs(query(collection(this.firestore, 'libros')));
  }

  deleteBooks(taskId: string) {
    return deleteDoc(doc(this.firestore, 'libros', taskId));
  }

  updateBook(id: string, data: any) {
    const bookDoc = doc(this.firestore, `libros/${id}`);
    return updateDoc(bookDoc, data);
  }
}
