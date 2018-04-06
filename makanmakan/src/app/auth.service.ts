import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Login } from './models/Login';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

	private url = 'http://localhost:8000/api/';  // URL to web api

  	constructor(private http:HttpClient) { }

    login(login: Login) {
    	const loginUrl= `${this.url}/login`;

        //return this.http.post<Response>(loginUrl, login, httpOptions);
        //localStorage.setItem('token', );
    }
          
    private setSession(authResult) {
        //const expiresAt = moment().add(authResult.expiresIn,'second');

        // localStorage.setItem('id_token', authResult.idToken);
        // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }          

    logout() {
        // localStorage.removeItem("id_token");
        // localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        // return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        // return !this.isLoggedIn();
    }

    getExpiration() {
        // const expiration = localStorage.getItem("expires_at");
        // const expiresAt = JSON.parse(expiration);
        // return moment(expiresAt);
    }    
}