import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {

  constructor(private http: HttpClient) { }

  searchBooks(query: string) {
    return this.http.get(`https://openlibrary.org/search.json?q=${query}`);
  }
}
