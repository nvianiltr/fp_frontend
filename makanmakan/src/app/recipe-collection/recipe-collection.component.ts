import {Component, OnInit} from '@angular/core';
import {Article} from '../models/Article';
import {ArticleService} from '../article.service';
import {Recipe} from '../models/Recipe';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../user.service';
import {User} from '../models/User';

@Component({
  selector: 'app-recipe-collection',
  templateUrl: './recipe-collection.component.html',
  styleUrls: ['./recipe-collection.component.css']
})
export class RecipeCollectionComponent implements OnInit {

  articles: Article[] = [];
  recipes: Recipe[] = [];
  user: User;
  isRecipeAvailable: boolean = true;
  selectedRecipe: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private userService: UserService,
    private location: Location,
    private recipeService: RecipeService) {
  }

  public ngOnInit() {
    this.user = this.userService.getUser();
    this.getPersonalRecipes();
  }

  setSelectedRecipe(id: any) {
    this.selectedRecipe = id;
  }

  deleteRecipe(){
    this.recipeService.deletePersonalRecipe(this.selectedRecipe).subscribe(() =>{
     location.reload();
    });
  }

  getPersonalRecipes(): void {
    this.recipeService.getPersonalRecipe(this.user.id).subscribe(recipes => {
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
