import { Component, OnInit } from '@angular/core';
import {User} from '../models/User';
import {Article} from '../models/Article';
import {Recipe} from '../models/Recipe';
import {ArticleService} from '../article.service';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  username: string;
  articles: Article[];
  recipes: Recipe[];
  isArticleAvailable: boolean = true;
  isRecipeAvailable: boolean = true;

  constructor(private articleService: ArticleService, private recipeService: RecipeService) {}

  ngOnInit() {
    this.username = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    this.getArticles();
    this.getRecipes();
  }

  getArticles(): void {
    this.articleService.getUserArticles(this.username)
      .subscribe(articles => {
        if (articles.length != 0) {
          this.isArticleAvailable = true;
          this.articles = articles;
          // console.log(this.articles);
        }
        else {
          this.isArticleAvailable = false;
        }
      });
  }

  getRecipes(): void {
    this.recipeService.getUserRecipes(this.username)
      .subscribe(recipes => {
        if (recipes.length != 0) {
          this.isRecipeAvailable = true;
          this.recipes = recipes;
        }
        else {
          this.isArticleAvailable = false;
        }
      });
  }
}
