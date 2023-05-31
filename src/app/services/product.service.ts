import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productDataType } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data: productDataType) {
    return this.http.post("http://localhost:3000/products", data);
  }

  getPorductList() {
    return this.http.get<productDataType[]>("http://localhost:3000/products");
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
}
