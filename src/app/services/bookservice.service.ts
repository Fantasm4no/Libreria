import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, query } from '@angular/fire/firestore';
import { Books } from '../domain/books';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {

  constructor(private http: HttpClient, private firestore: Firestore) { }

  searchBooks(query: string) {
    return this.http.get(`https://openlibrary.org/search.json?q=${query}`);
  }

  addBooks(book: Books) {
    return addDoc(collection(this.firestore, 'tareas'), Object.assign({}, book));
  }

  getBooks() {
    return getDocs(query(collection(this.firestore, 'tareas')));
  }

  deleteBooks(taskId: string) {
    return deleteDoc(doc(this.firestore, 'tareas', taskId));
  }
}
