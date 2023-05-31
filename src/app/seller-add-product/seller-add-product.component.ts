import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { productDataType } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  form_alert_message: string | undefined;
  form_alert_type: string | undefined;
  constructor(private productservice: ProductService) { }


  submit(data: productDataType) {
    this.form_alert_message = "";

    if (data.name == "") {
      this.form_alert_type = "alert-danger";
      this.form_alert_message = "Enter the product name.";
    }

    if (this.form_alert_message == "") {
      this.form_alert_type = "alert-info";
      this.form_alert_message = "Please Wait!";

      this.productservice.addProduct(data).subscribe((result) => {
        if (result) {
          this.form_alert_type = "alert-success";
          this.form_alert_message = "Product is successfully added.";
        }
        setTimeout(() => {
          this.form_alert_type = '';
          this.form_alert_message = '';
        }, 3000);
      });
    }
  }
}
