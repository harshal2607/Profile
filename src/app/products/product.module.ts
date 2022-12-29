import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductList } from './components/product-component';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [ProductList],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ProductRoutingModule,
  ],
})
export class ProductModule {}
