import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private http = inject(HttpClient);
  private apiUrl = 'https://fakestoreapi.com/products';

 //fetch all products
  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

    //fetch product by id
  getProductById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

}