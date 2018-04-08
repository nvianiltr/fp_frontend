import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { Recipe } from './models/Recipe';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RecipeService {
	private recipesUrl = 'http://localhost:8000/api/Recipe';  // URL to web api

	constructor(private http: HttpClient) { }

	getRecipes (): Observable<Recipe[]> {
		//let response: any = {};
		return this.http.get<Recipe[]>(this.recipesUrl).map(res => {console.log(res); return res;});
		//.map( res => { console.log(res); 
		//			response = res;
		//			return res;
		//	});
	}
 
 getRecipeByID(id: number): Observable<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.get<Recipe>(url).map(res => {console.log(res); return res;});
  }

    updateRecipe(recipe:Recipe, id:number): Observable<Recipe>{
    const url = `${this.recipesUrl}/${id}`;
  	   return this.http.patch<Recipe>(url, recipe, httpOptions);
  }
}
