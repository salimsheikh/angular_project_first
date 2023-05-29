import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import {Router}  from '@angular/router';
import { SignUpDataType } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit  {
  constructor(private seller:SellerService, private router: Router){}
  ngOnInit(): void {}

  /*
  paramiter data:object|any
  */
  submitSellerSignUp(data:SignUpDataType):void{
    console.warn(data);
    this.seller.userSignUpService(data).subscribe((results) => {
      if(results){
        this.router.navigate(["seller-home"]);
      }
    });
  }
}
