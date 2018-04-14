import { Component, OnInit } from '@angular/core';
import { Article } from '../models/Article';
import { ArticleService } from '../article.service';
import { DatePipe } from '@angular/common';

import { Recipe } from '../models/Recipe';
import { RecipeService } from '../recipe.service';

import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

import * as $ from 'jquery';

@Component({
  selector: 'app-recipe-collection',
  templateUrl: './recipe-collection.component.html',
  styleUrls: ['./recipe-collection.component.css']
})
export class RecipeCollectionComponent implements OnInit {

  articles: Article[] = [];
  recipes: Recipe[] = [];
  isArticleAvailable:  boolean;
  isRecipeAvailable:  boolean;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private articleService: ArticleService,
    private location: Location,
    private recipeService: RecipeService) { }

  public ngOnInit()
  {
    $(document).ready(function(){
      $("#personal-article").click(function(){
        
      })
    });

    this.getPersonalArticles();
    this.getPersonalRecipes();
  }

  getPersonalArticles(): void {
	const id = +this.route.snapshot.paramMap.get('id');
    //console.log(id);
    this.articleService.getPersonalArticle(id).
    	subscribe(articles => {
        if(articles.length!=0) {
        this.articles = articles;
        console.log(this.articles);
        this.isArticleAvailable = true;
      }
      else {
        this.isArticleAvailable = false;
      }});
  }

  // deleteArticle():void{
  //       const id = +this.route.snapshot.paramMap.get('id');
  //   //console.log(id);
  //   this.articleService.deletePersonalArticle(id).subscribe(article => {this.articles = article;});
  //     //.subscribe(article => this.article = article);
  // }

  getPersonalRecipes(): void{
  const id = +this.route.snapshot.paramMap.get('id');
    //console.log(id);
    this.recipeService.getPersonalRecipe(id).
      subscribe(recipes => {
        if(recipes.length!=0) {
        this.recipes = recipes;
        console.log(this.recipes);
        this.isRecipeAvailable = true;
      }
      else {
        this.isRecipeAvailable = false;
      }});    
  }

  saveCollection():void{

  }


}
