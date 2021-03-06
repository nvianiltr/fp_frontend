import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';
import 'rxjs/add/operator/map';

import {Article} from './models/Article';
import {Recipe} from './models/Recipe';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
  }),
};


@Injectable()
export class ArticleService {
  private articlesUrl = 'https://api.makanmakan.me/api/Article';  // URL to web api

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesUrl);
  }

  getArticleByID(id: number): Observable<Article> {
    const url = `${this.articlesUrl}/${id}`;
    return this.http.get<Article>(url).map(res => {
      // console.log(res);
      return res;
    });
  }

  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.articlesUrl, article, httpOptions)
    .map(res=>{console.log(res); return res;});
  }

  getPersonalArticle(id: number):Observable<Article[]>{
    const url = `${this.articlesUrl}/personal-article/${id}`;
    return this.http.get<Article[]>(url,httpOptions).map(res => {
     // console.log(res);
      return res;
    });
  }

  updateArticle(article: Article, id: number): Observable<Article> {
    const url = `${this.articlesUrl}/${id}`;
    return this.http.put<Article>(url, article, httpOptions);
  }

  deletePersonalArticle(id:number): any{
    const url = `${this.articlesUrl}/${id}`;
    console.log(url);
    return this.http.delete(url, httpOptions).map(res => {
      console.log(res);
    });
  }

  /* SAVE SOMEONE'S ARTICLE */
  saveArticle(obj: any) {
    const url = `${this.articlesUrl}/saved-article`;
    return this.http.post(url, obj, httpOptions).map(res=>{return res;});
  }

  /* REMOVE AN ARTICLE FROM SAVED ARTICLE TABLE */
  removeSavedArticle(obj: any) {
    const url = `${this.articlesUrl}/saved-article/${obj.user_id}/${obj.article_id}`;
    return this.http.delete(url, httpOptions).map(res=>{return res;});
  }

  /* GET USER'S SAVED ARTICLE(S) */
  getSavedArticles(id: number):Observable<Article[]> {
    const url = `${this.articlesUrl}/saved-article/${id}`;
    return this.http.get<Article[]>(url, httpOptions).map(res => {
      return res;
    });
  }

  /* GET USER'S ARTICLE(S) */
  getUserArticles(username: string):Observable<Article[]> {
    const url = `${this.articlesUrl}/user/${username}`;
    return this.http.get<Article[]>(url, httpOptions).map(res => {
      return res;
    });
  }
}
