import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    // private jwt: JwtHelper,
    private router: Router
  ) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token')
    if (token) {
      let decoded = jwtDecode(token)
      let expiryDate = moment.unix(decoded.exp)
      return moment().isBefore(expiryDate)
    }
    else
      return false;
  }

  loggedIn(response: any): void {
    this.setToken(response)
    this.router.navigateByUrl('/')
  }

  setToken(response: any): void{
    localStorage.setItem('token', response.token)
    localStorage.setItem('userId', response.user._id)
    localStorage.setItem('userInfo', JSON.stringify(response.user))
  }

  login(email: string, password: string): Observable<any>{
    return this.http.post('/api/user/login', {email: email, password: password})
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/account/login')
  }

  signup(data: any): Observable<any> {
    return this.http.post('/api/user/signup', data)
  }

}
