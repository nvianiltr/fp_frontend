import {Component, OnInit} from '@angular/core';
import {Article} from '../models/Article';
import {ArticleService} from '../article.service';
import {Recipe} from '../models/Recipe';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../user.service';
import {User} from '../models/User';
import * as $ from 'jquery';

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
  private _recipes: Recipe[] = null;

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

  search() {
    var string = $('#searchField').val().toLowerCase();
    if(string == ""){
      this.recipes = this._recipes;
    }
    this.recipes = this._recipes.filter(function (element) {
      return element.title.toLowerCase().includes(string);
    });
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
        this.recipes = this._recipes = recipes;
        this.isRecipeAvailable = true;
      }
      else {
        this.isRecipeAvailable = false;
      }
    });
  }
}
