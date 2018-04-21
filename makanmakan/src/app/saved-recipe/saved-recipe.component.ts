import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../recipe.service';
import {UserService} from '../user.service';
import {Location} from '@angular/common';
import {Recipe} from '../models/Recipe';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/User';

@Component({
  selector: 'app-saved-recipe',
  templateUrl: './saved-recipe.component.html',
  styleUrls: ['./saved-recipe.component.css']
})
export class SavedRecipeComponent implements OnInit {

  recipes: Recipe[] = [];
  user: User;
  isRecipeAvailable: boolean = true;
  selectedRecipe: number = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private recipeService: RecipeService) {
  }

  public ngOnInit() {
    this.user = this.userService.getUser();
    this.getSavedRecipes();
  }

  deleteRecipe(){
    var _obj = {
      'user_id': this.user.id,
      'recipe_id': this.selectedRecipe
    };
    this.recipeService.removeSavedRecipe(_obj).subscribe(()=>{location.reload()});
  }

  setSelectedRecipe(id: any) {
    this.selectedRecipe = id;
  }

  getSavedRecipes(): void {
    this.recipeService.getSavedRecipes(this.user.id).subscribe(recipes => {
      if (recipes.length != 0) {
        this.recipes = recipes;
        this.isRecipeAvailable = true;
      }
      else {
        this.isRecipeAvailable = false;
      }
    });
  }

}
