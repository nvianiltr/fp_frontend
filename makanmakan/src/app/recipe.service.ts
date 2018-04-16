import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { Recipe } from './models/Recipe';

const httpOptions = {
  headers: new HttpHeaders({
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${localStorage.token}`
  }),
};

@Injectable()
export class RecipeService {
	private recipesUrl = 'http://localhost:8000/api/Recipe';  // URL to web api

  private personalrecipesUrl = 'http://localhost:8000/api/SavedRecipe';  // URL to web api


	constructor(private http: HttpClient) { }

	getRecipes (): Observable<Recipe[]> {
		return this.http.get<Recipe[]>(this.recipesUrl).map(res => {console.log(res); return res;});
	}

  getRecipe(id: number): Observable<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.get<Recipe>(url).map(res => {console.log(res); return res;});
  }

  getTags() {
    const url = 'http://localhost:8000/api/TagCategory'
    return this.http.get(url).map(res => {return res});
  }

    updateRecipe(recipe:Recipe, id:number): Observable<Recipe>{
    const url = `${this.recipesUrl}/${id}`;
  	   return this.http.patch<Recipe>(url, recipe, httpOptions);
  }

  searchRecipe(name: string): Observable<Recipe[]>  {
	  const url = `${this.recipesUrl}/search/${name}`;
    return this.http.get<Recipe[]>(url).map(res => {return res;});
  }

  getPersonalRecipe(id: number):Observable<Recipe[]>{
    const url = `${this.personalrecipesUrl}/${id}`;
    return this.http.get<Recipe[]>(url,httpOptions).map(res => {
      console.log(res);
      return res;
    });
  }

  deletePersonalRecipe(id:number):any{
   const url = `${this.recipesUrl}/${id}`;
    console.log(url);
    return this.http.delete(url, httpOptions).map(res => {
      console.log(res);
    });
  }

  addRecipe(recipe:Recipe):Observable<Recipe>{
    return this.http.post<Recipe>(this.recipesUrl, recipe, httpOptions)
    .map(res=>{console.log(res); return res;});
  }
  
}
