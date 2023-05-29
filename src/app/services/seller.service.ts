import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { SignUpDataType } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http:HttpClient) { }
  /*
      data type: any|object
   */
  userSignUpService(data:SignUpDataType){
    return this.http.post("http://localhost:3000/seller",data);
  }
}
