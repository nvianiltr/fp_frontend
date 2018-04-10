import { Component, OnInit } from '@angular/core';
import { Recipe } from "../models/Recipe";
import { RecipeService } from "../recipe.service";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipes: Recipe[] = [];
  isRecipeAvailable: boolean;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.getRecipes()
      .subscribe(recipes => {
        if(recipes.length!=0) {
          this.recipes = recipes;
          this.isRecipeAvailable = true;
        }
        else {
          this.isRecipeAvailable = false;
        }
      });
  }
}
