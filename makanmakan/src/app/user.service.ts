import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Signup } from './models/Signup';
import { Login } from './models/Login';
import { User } from './models/User';
import { Review } from './models/Review';
import { Report } from './models/Report';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
  }),
};

@Injectable()
export class UserService {
  private url = 'https://api.makanmakan.me/api';  // URL to web api
  private token: string;
  private user: User;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  isLogin(): boolean {
    if (this.token != null ){
      return true;
    }
    else {
      return false;
    }
  }

  getUser(): User {
    return this.user;
  }

  register(signup: Signup) {
    const registerUrl = `${this.url}/register`;
    return this.http.post(registerUrl, signup, httpOptions).map(res => {
      console.log(res);
      return res;
    });
  }

  login(login: Login) {
    const loginUrl = `${this.url}/login`;
    return this.http.post(loginUrl, login, httpOptions).map(res => {
      localStorage.setItem('token', res['data']['token']);
      localStorage.setItem('user', JSON.stringify(res['data']['user']));
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      return res;
    });
  }

  logout() {
    const logoutUrl = `${this.url}/logout`;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return this.http.get(logoutUrl, httpOptions);
  }

  addReview(review: Review){
    const reviewUrl = `${this.url}/Review`;
    return this.http.post(reviewUrl, review, httpOptions).map(res=>{return res;});
  }

  addReport(report:Report): Observable<any>{
    const reportUrl = `${this.url}/ReportedReview`;
    return this.http.post<any>(reportUrl, report, httpOptions)
      .map(res=>{console.log(res); return res;})
      .catch(err=>{return Observable.throw(err);});
  }
}

