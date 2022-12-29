import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductList implements OnInit {
  responseData: any = null;
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [3, 6, 9, 12];
  isAuthenticated: boolean = false;
  data: any;
  filteredData: any;

  constructor(private appService: AppService) {}
  ngOnInit() {
    this.fetchProducts().subscribe((data: any) => {
      this.responseData = data;
      this.isAuthenticated = !!data;
      this.filteredData = data;
    });
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.fetchProducts();
  }

  fetchProducts() {
    return this.appService.fetchAllData();
  }

  addProduct(product: any) {
    this.appService.addtoCart(product);
  }

  filterBySearch() {
    if (this.data !== '') {
      this.filteredData = this.responseData.filter((res: any) => {
        return res.Model.toLowerCase().match(this.data.toLowerCase());
      });
    } else {
      return (this.filteredData = this.responseData);
    }
  }

  textChanged(value: any) {
    this.data = value;

    this.filterBySearch();
  }
}
