import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { productDataType } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  updateId: number;
  productData: undefined | productDataType;
  form_alert_message: string | undefined;
  form_alert_type: string | undefined;
  //product: string | productDataType;
  constructor(private productservice: ProductService, private route: ActivatedRoute, private router: Router) {
    this.updateId = 0;
  }
  ngOnInit(): void {

    let mapid = this.route.snapshot.paramMap.get('id');
    if (mapid != null) {
      this.updateId = parseInt(mapid);
      this.getProduct(this.updateId);
    }
  }

  submit(data: any) {
    this.form_alert_type = "alert-info";
    this.form_alert_message = "Please Wait!";

    if (this.productData) {
      data.id = this.productData.id;
    }

    this.productservice.updateProduct(data).subscribe((resuslt) => {
      if (resuslt) {
        this.form_alert_type = "alert-success";
        this.form_alert_message = "Product updated successfully.";
      } else {
        this.form_alert_type = "alert-danger";
        this.form_alert_message = "Try again found some error.";
      }

      setTimeout(() => {
        this.form_alert_message = undefined;
        this.router.navigate(['/seller-home']);
      }, 3000);

    });


  }

  getProduct(id: number) {
    this.productservice.getProduct(id).subscribe((data) => {
      if (data) {
        this.productData = data;
      }
    });
  }
}
