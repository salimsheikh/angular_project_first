

import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { SellerService } from './services/seller.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const sellerService = inject(SellerService);


  if (localStorage.getItem('seller')) {
    sellerService.isSellerLoggedIn.next(true);
    return true;
  }

  let l = sellerService.isSellerLoggedIn;
  if (l) {
    return true;
  } else {
    return false;
  }
};