import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productDataType } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProductService(data: productDataType) {
    console.warn("Service called");
    return this.http.post("http://localhost:3000/products", data);
  }
}
