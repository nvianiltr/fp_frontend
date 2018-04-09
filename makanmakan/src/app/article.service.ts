import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { Article } from './models/Article';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ArticleService {
	private articlesUrl = 'http://localhost:8000/api/Article';  // URL to web api

	constructor(private http: HttpClient) { }

	getArticles (): Observable<Article[]> {
		//let response: any = {};
		return this.http.get<Article[]>(this.articlesUrl);
		//.map( res => { console.log(res);
		//			response = res;
		//			return res;
		//	});
	}

 getArticleByID(id: number): Observable<Article> {
    const url = `${this.articlesUrl}/${id}`;
    return this.http.get<Article>(url).map(res => {console.log(res); return res;});
  }

  updateArticle(article:Article, id:number): Observable<Article>{
    const url = `${this.articlesUrl}/${id}`;
  	   return this.http.patch<Article>(url, article, httpOptions);
  }

  addArticle(article:Article): Observable<Article>{
  	return this.http.post<Article>(this.articlesUrl, article, httpOptions);
  }

}