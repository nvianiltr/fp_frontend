import { Component, OnInit } from '@angular/core';
import { Article } from '../models/Article';
import { ArticleService } from '../article.service';
import { DatePipe } from '@angular/common';

import { Recipe } from '../models/Recipe';
import { RecipeService } from '../recipe.service';

import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

import * as $ from 'jquery';

import {User} from '../models/User';
@Component({
  selector: 'app-personal-article',
  templateUrl: './personal-article.component.html',
  styleUrls: ['./personal-article.component.css']
})
export class PersonalArticleComponent implements OnInit {


  articles: Article[];
  article: Article;
  recipes: Recipe[];
  isArticleAvailable:  boolean;
  isRecipeAvailable:  boolean;
  user: User;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private articleService: ArticleService,
    private location: Location,
    private recipeService: RecipeService) { }

  public ngOnInit()
  {
    $(document).ready(function(){
        $("button").click(function(){
            var div = $("#personal-recipe");  
//            div.animate({left: '100px'}, "slow");
//            div.animate({fontSize: '5em'}, "slow");
              div.hide();
        });
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

  deleteArticle(id: any){
        // const id = +this.route.snapshot.paramMap.get('id');
    //console.log(id);
    this.articleService.deletePersonalArticle(id).subscribe(article => {this.article = article;
    window.location.reload(true)});
      //.subscribe(article => this.article = article);
  }

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

  toPersonalArticle():void{
    this.router.navigate(['/user/'+this.user.id+'/recipe-collection/personal-article']);
  }

  saveCollection():void{

  }

}
