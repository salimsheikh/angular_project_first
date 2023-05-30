import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showSellerLogout = false;
  menuType: String = "default";
  sellerDisplayName: String = "blank";

  constructor(private seller: SellerService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (val.url.includes("seller") && localStorage.getItem('seller')) {

          let sellerStore = localStorage.getItem('seller');
          if (sellerStore) {
            let sellerData = JSON.parse(sellerStore);
            if (sellerData.length > 0) {
              this.sellerDisplayName = sellerData[0].name;
            }
          }
          this.menuType = 'seller';
        } else {
          this.menuType = 'default';
        }
      }
    });

    this.showSellerLogout = false;
    if (this.seller.isSellerLoggedIn) {
      this.showSellerLogout = true;
    }
  }


  logout() {
    this.seller.isSellerLoggedIn.next(false);
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }



}
