import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showSellerLogout = false;
  menuType: String = "default";

  constructor(private seller: SellerService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (val.url.includes("seller") && localStorage.getItem('seller')) {
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




}
