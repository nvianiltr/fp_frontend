import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Signup } from './models/Signup';
import { Login } from './models/Login';
import { User } from './models/User';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
  }),
};

@Injectable()
export class UserService {
  private url = 'http://localhost:8000/api';  // URL to web api
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

}

