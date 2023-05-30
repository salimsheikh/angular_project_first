import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showSellerLogout = false;

  constructor(private seller: SellerService) { }

  ngOnInit(): void {
    this.showSellerLogout = false;
    if (this.seller.isSellerLoggedIn) {
      this.showSellerLogout = true;
    }
  }




}
