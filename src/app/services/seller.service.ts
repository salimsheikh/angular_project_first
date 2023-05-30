import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SellerLoginDataType, SignUpDataType } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<Boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }
  userSignUpService(data: SignUpDataType) {
    let results = this.http.post("http://localhost:3000/seller", data, { observe: 'response' }).subscribe((results) => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(results.body));
      this.router.navigate(['seller-home']);
    });
  }

  sellerLoginService(data: SellerLoginDataType) {
    localStorage.setItem('seller', '');
    let login_url = 'http://localhost:3000/seller?email=' + data.email + '&password=' + data.password;
    let results = this.http.get(login_url, { observe: 'response' }).subscribe((result: any) => {
      if (result.body && result.body.length > 0) {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
        this.isLoginError.emit(false);
      } else {
        this.isLoginError.emit(true);
        console.warn("invalid login details");
      }
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.isSellerLoggedIn.next(false);
    this.router.navigate(['/']);
  }

  reloadSeller() {
    //localStorage.setItem('seller', '')
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    } else {
      //this.router.navigate(['seller-auth']);
    }
  }
}
