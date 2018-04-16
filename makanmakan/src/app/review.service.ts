import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';
import 'rxjs/add/operator/map';

import {Review} from './models/Review';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }),
};

@Injectable()
export class ReviewService {
  private reviewUrl = 'http://localhost:8000/api/Review';  // URL to web api

  constructor(private http: HttpClient) { }

  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.reviewUrl, review, httpOptions)
    .map(res=>{console.log(res); return res;});
  }

}
