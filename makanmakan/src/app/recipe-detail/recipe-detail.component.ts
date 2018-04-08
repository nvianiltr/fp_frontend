import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Recipe } from '../models/Recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

	recipe: Recipe;

  constructor(
  	private Route: ActivatedRoute,
  	private recipeService:RecipeService,
  	private location:Location
  	) { }

  ngOnInit():void {
  	this.getRecipe();
  }

  getRecipe():void{
  	const id = +this.Route.snapshot.paramMap.get('id');
    console.log(id);
  	this.recipeService.getRecipeByID(id).subscribe(
      res => {
        this.recipe = res;
      }, err => {
      });
  }

}
