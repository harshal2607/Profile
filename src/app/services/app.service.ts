import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppService implements OnInit {
  items: any = [];
  inputValue: any;
  count: number = 0;
  responseData: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAllData().subscribe((data) => {
      this.responseData = data;
    });
  }
  addtoCart(product: any) {
    this.items.push(product);
    this.count++;
  }
  getItems() {
    return this.items;
  }

  fetchAllData() {
    return this.http.get('http://localhost:3000/POSTS');
  }
}
