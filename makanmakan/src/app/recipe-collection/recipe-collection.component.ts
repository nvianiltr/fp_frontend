import {Component, OnInit} from '@angular/core';
import {Article} from '../models/Article';
import {ArticleService} from '../article.service';
import {Recipe} from '../models/Recipe';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../user.service';
import * as $ from 'jquery';
import {User} from '../models/User';

@Component({
  selector: 'app-recipe-collection',
  templateUrl: './recipe-collection.component.html',
  styleUrls: ['./recipe-collection.component.css']
})
export class RecipeCollectionComponent implements OnInit {

  articles: Article[] = [];
  recipes: Recipe[] = [];
  user: User = this.userService.getUser();
  isArticleAvailable: boolean;
  isRecipeAvailable: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private userService: UserService,
    private location: Location,
    private recipeService: RecipeService) {
  }

  public ngOnInit() {
    $(document).ready(function () {});
    this.getPersonalArticles();
    this.getPersonalRecipes();
  }

  getPersonalArticles(): void {
    console.log(this.user.id);
    this.articleService.getPersonalArticle(this.user.id).subscribe(articles => {
      if (articles.length != 0) {
        this.articles = articles;
        console.log(this.articles);
        this.isArticleAvailable = true;
      }
      else {
        this.isArticleAvailable = false;
      }
    });
  }

  getPersonalRecipes(): void {
    this.recipeService.getPersonalRecipe(this.user.id).subscribe(recipes => {
      if (recipes.length != 0) {
        this.recipes = recipes;
        console.log(this.recipes);
        this.isRecipeAvailable = true;
      }
      else {
        this.isRecipeAvailable = false;
      }
    });
  }

  saveCollection(): void {

  }


}
