import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class PreventAuthGuard implements CanActivate {

  constructor(
    private account: AccountService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(this.account.isAuthenticated()) {
        this.router.navigateByUrl('/')
        return false
      }
      return true
  }
  
}
