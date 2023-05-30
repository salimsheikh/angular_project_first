import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUpDataType } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller: SellerService, private router: Router) { }

  showLogin = false;
  authError = '';

  ngOnInit(): void {
    if (this.router.url == "/seller-login") {
      this.showLogin = true;
    } else if (this.router.url == "/seller-logout") {
      this.showLogin = true;
      this.seller.logout();
    }
    this.seller.reloadSeller();
  }

  submitSellerSignUp(data: SignUpDataType): void {
    this.seller.userSignUpService(data);
  }

  submitSellerLogin(data: SignUpDataType): void {
    this.authError = '';
    if (data.email == "") {
      this.authError = 'Enter your email.';
    }

    if (data.password == "") {
      this.authError = 'Enter your login password.';
    }

    if (this.authError == "") {
      this.seller.sellerLoginService(data);
      this.seller.isLoginError.subscribe((error) => {
        if (error) {
          this.authError = 'Email or password is invalid';
        }
      });
    }
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }
}
