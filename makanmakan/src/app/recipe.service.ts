import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Recipe } from './models/Recipe';
import {Ingredient} from './models/Ingredient';

const httpOptions = {
  headers: new HttpHeaders({
   'Content-Type': 'application/json',
   'Authorization': `Bearer ${localStorage.token}`
  }),
};

@Injectable()
export class RecipeService {
	private recipesUrl = 'http://localhost:8000/api/Recipe';
  private personalrecipesUrl = 'http://localhost:8000/api/SavedRecipe';

	constructor(private http: HttpClient) { }

	/* GET RECIPES FROM EVERYONE */
	getRecipes (): Observable<Recipe[]> {
		return this.http.get<Recipe[]>(this.recipesUrl).map(res => {return res;});
	}

	/* GET A SPECIFIC RECIPE BY ID FOR RECIPE-DETAIL COMPONENT */
  getRecipe(id: number): Observable<Recipe> {
    const url = `${this.recipesUrl}/${id}`;
    return this.http.get<Recipe>(url).map(res => {return res;});
  }

  /* SEARCH FOR RECIPE(S) THAT MATCH USER'S CRITERIA */
  searchRecipe(name: string): Observable<Recipe[]>  {
	  const url = `${this.recipesUrl}/search/${name}`;
    return this.http.get<Recipe[]>(url).map(res => {return res;});
  }

  /* GET ALL RECIPE TAGS / CATEGORIES */
  getTags() {
    const url = 'http://localhost:8000/api/TagCategory'
    return this.http.get(url).map(res => {return res});
  }

  /* GET INGREDIENT DETAILS FROM A SPECIFIC RECIPE */
  getIngredients(recipe_id: number): Observable<Ingredient[]> {
	  const url = `${this.recipesUrl}/IngredientDetails/${recipe_id}`;
	  return this.http.get<Ingredient[]>(url,httpOptions).map(res=>{return res;});
  }

  /* ADD NEW INGREDIENT NAME TO INGREDIENTS TABLE */
  addIngredients(obj: any){
    const url = `${this.recipesUrl}/Ingredient`;
    return this.http.post(url,obj,httpOptions).map(res=>{return res;})
  }

  /* DELETE INGREDIENT DETAILS FROM INGREDIENTS_DETAILS TABLE */
  deleteIngredientDetails(ingredient_id:number, recipe_id: number){
    const url = `${this.recipesUrl}/IngredientDetails/${ingredient_id}/${recipe_id}`;
	  return this.http.delete(url,httpOptions).map(res=>{return res;});
  }

  /* UPDATE INGREDIENT DETAILS (e.g.: Name, Quantity, or Unit) IN INGREDIENT_DETAILS TABLE */
  updateIngredientDetails(ingredient: any){
    const url = `${this.recipesUrl}/IngredientDetails/${ingredient.ingredient_id}`;
    return this.http.put(url, ingredient, httpOptions).map(res=>{return res;});
  }

  /* ADD INGREDIENT DETAILS TO INGREDIENT_DETAILS TABLE */
  addIngredientDetails(obj: any){
    const url = `${this.recipesUrl}/IngredientDetails`;
    return this.http.post(url,obj,httpOptions).map(res=>{return res;})
  }

  /* ADD TAG DETAILS TO A SPECIFIC RECIPE */
  /* obj CONTAINS RECIPE ID AND TAG ID */
  addTagDetails(obj: any){
    const url = `${this.recipesUrl}/TagDetails`;
    return this.http.post(url,obj,httpOptions).map(res => {return res;})
  }

  /* DELETE A TAG DETAIL FROM A SPECIFIC RECIPE WHERE ITS TAG_ID == tag_id */
  deleteTagDetails(tag_id:number, recipe_id: number){
    const url = `${this.recipesUrl}/TagDetails/${tag_id}/${recipe_id}`;
    return this.http.delete(url,httpOptions).map(res => {return res;})
  }

  /* GET USER'S PERSONAL RECIPE(S) */
  getPersonalRecipe(id: number):Observable<Recipe[]>{
    const url = `${this.personalrecipesUrl}/${id}`;
    return this.http.get<Recipe[]>(url,httpOptions).map(res => {
      console.log(res);
      return res;
    });
  }

  /* ADD A PERSONAL RECIPE */
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.recipesUrl, recipe, httpOptions).map(res=>{return res;});
  }

  /* UPDATE USER'S PERONAL RECIPE */
  updateRecipe(recipe:Recipe, id:number): Observable<Recipe>{
    const url = `${this.recipesUrl}/${id}`;
    return this.http.put<Recipe>(url, recipe, httpOptions);
  }

  /* DELETE USER'S PERSONAL RECIPE */
  deletePersonalRecipe(id:number):any{
    const url = `${this.recipesUrl}/${id}`;
    console.log(url);
    return this.http.delete(url, httpOptions).map(res => {
      console.log(res);
    });
  }
}


