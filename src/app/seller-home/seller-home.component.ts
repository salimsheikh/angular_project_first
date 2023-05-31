import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { productDataType } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {

  productList: undefined | productDataType[];

  constructor(private productservice: ProductService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productservice.getPorductList().subscribe((results) => {
      console.warn(results);
      this.productList = results;
    });
  }
}
