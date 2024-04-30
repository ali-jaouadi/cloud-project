import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor( public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!sessionStorage.getItem('token')) {
        this.router.navigateByUrl("/login")
        return false;
      }
      let token=sessionStorage.getItem('token')||""
      let user:any=jwtDecode(token)
      if(user.role=="admin")  return true
      else{
        this.router.navigateByUrl("/login")
      return false
      }
  }
  
}
