import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Signup } from './models/Signup';
import { Login } from './models/Login';


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
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
  }

  isLogin(): boolean {
    if (this.token != null ){
      return true;
    }
    else {
      return false;
    }
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
      this.token = localStorage.getItem('token');
      console.log(res);
      return res;
    });
  }

  logout() {
    const logoutUrl = `${this.url}/logout`;
    localStorage.removeItem('token');
    return this.http.get(logoutUrl, httpOptions);
  }

}

