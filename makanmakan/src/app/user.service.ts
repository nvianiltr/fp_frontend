import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { Signup } from './models/Signup';

export interface rspn {
  "success": string;
  "message": string;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class UserService {
	private url = 'http://localhost:8000/api';  // URL to web api

  	constructor(private http:HttpClient) { }

  	register(signup: Signup) {
  		const registerUrl= `${this.url}/register`;
  		return this.http.post(registerUrl, signup, httpOptions).map(res => {
      console.log(res);
      return res;
    });
	}
}