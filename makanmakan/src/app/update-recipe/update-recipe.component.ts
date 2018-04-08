import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { Recipe } from '../models/Recipe';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css']
})
export class UpdateRecipeComponent implements OnInit {

  @Input() recipe: Recipe;  
  
  constructor(
    private route:ActivatedRoute,
    private recipeService: RecipeService,
    private location: Location) { }

  ngOnInit():void {
  	this.getArticle();
  }

  getArticle():void {
    const id = +this.route.snapshot.paramMap.get('id');
    //console.log(id);
    this.recipeService.getRecipeByID(id).subscribe(recipe => {this.recipe = recipe;});
      //.subscribe(article => this.article = article);
  }

  goBack(): void {
    this.location.back();
  }

  save():void{
    const id = +this.route.snapshot.paramMap.get('id');
  	this.recipeService.updateRecipe(this.recipe, id).subscribe(()=>this.goBack());
  }
}
