import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {Location, DatePipe} from '@angular/common';

import { Recipe } from '../models/Recipe';
import { RecipeService } from '../recipe.service';

import { User } from '../models/User';
import {UserService} from '../user.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css']
})
export class UpdateRecipeComponent implements OnInit {

  @Input() recipe: Recipe;

  user: User;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private recipeService: RecipeService,
    private location: Location,
    private userService: UserService, private datepipe: DatePipe) { }

  ngOnInit():void {
  	this.getArticle();
  }

  getArticle():void {
    const id = +this.route.snapshot.paramMap.get('id');
    //console.log(id);
    this.recipeService.getRecipe(id).subscribe(recipe => {this.recipe = recipe;});
      //.subscribe(article => this.article = article);
  }

  goBack(): void {
    this.location.back();
  }

  save():void{
   //      this.user = this.userService.getUser();
   //  this.recipe.user_id = this.user.id;
   // this.recipe.dateCreated = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const id = +this.route.snapshot.paramMap.get('id');
  	this.recipeService.updateRecipe(this.recipe, id).subscribe(()=>this.goBack());
  }
}
