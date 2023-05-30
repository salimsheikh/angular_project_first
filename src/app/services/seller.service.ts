import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpDataType } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<Boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }
  userSignUpService(data: SignUpDataType) {
    let results = this.http.post("http://localhost:3000/seller", data, { observe: 'response' }).subscribe((results) => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(results.body));
      this.router.navigate(['seller-home']);
    });
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
