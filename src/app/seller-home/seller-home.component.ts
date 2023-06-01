import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { productDataType } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {

  form_alert_message: string | undefined;
  form_alert_type: string | undefined;
  delete_icon = faTrash;
  edit_icon = faEdit;
  productList: undefined | productDataType[];

  constructor(private productservice: ProductService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productservice.getPorductList().subscribe((results) => {
      this.productList = results;
    });
  }

  deleteProduct(id: number) {
    this.productservice.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.form_alert_type = "alert-success";
        this.form_alert_message = "Product is deleted";
        setTimeout(() => {
          this.form_alert_message = "";
        }, 3000);
        this.getProductList();
      }
    });
  }
}
