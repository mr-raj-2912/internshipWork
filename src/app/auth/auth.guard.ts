import { Injectable } from '@angular/core';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,UrlTree,Router,} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, map, of } from 'rxjs';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}
  canActivate() {
    //get the jwt token which are present in the local storage
    const token = localStorage.getItem('jwt');
    if(token!==null)
    {
      var user = this.jwtHelper.decodeToken(token);
      localStorage.setItem("loggedInUser", JSON.stringify(user));
    }
    
    //Check if the token is expired or not and if token is expired then redirect to login page and return false
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
