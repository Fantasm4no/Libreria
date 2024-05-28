import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookserviceService } from '../../services/bookservice.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  books: any[] = [];
  searchForm: FormGroup;
  usuario: any
  email: any
  
  constructor(private bookService: BookserviceService, private fb: FormBuilder,
    private userService: UsersService){
      this.usuario = this.userService.user
      this.email = this.userService.email
    this.searchForm = this.fb.group({
      query: ['']
    });
  }

  ngOnInit(){}

  onSearch() {
    const query = this.searchForm.value.query;
    this.bookService.searchBooks(query).subscribe((data: any) => {
      this.books = data.docs;
    });
  }

  getCoverUrl(cover_i: number) {
    return cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : 'default-cover.jpg';
  }
}
