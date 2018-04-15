import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {Location, DatePipe} from '@angular/common';

import { Recipe } from '../models/Recipe';
import { RecipeService } from '../recipe.service';

import { User } from '../models/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.css']
})

export class RecipeEditorComponent implements OnInit {

  @Input() recipe: Recipe;
  units: string[] = ['person','people','serving','servings','cup','cups','quart','quarts','gallon','gallons','dozen','liter','liters'];
  user: User;
  tags: any = [];

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private recipeService: RecipeService,
    private location: Location,
    private userService: UserService,
    private datepipe: DatePipe) { }

  ngOnInit():void {
    this.recipe = new Recipe();
    this.getTags();
  }

  getTags() {
    this.recipeService.getTags().subscribe(res => {
      this.tags = res;
    });

  }



  // getRecipe():void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   //console.log(id);
  //   this.recipeService.getRecipe(id).subscribe(recipe => {this.recipe = recipe;});
  //   //.subscribe(article => this.article = article);
  // }
  //
  // goBack(): void {
  //   this.location.back();
  // }
  //
  // save():void{
  //   //      this.user = this.userService.getUser();
  //   //  this.recipe.user_id = this.user.id;
  //   // this.recipe.dateCreated = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   this.recipeService.updateRecipe(this.recipe, id).subscribe(()=>this.goBack());
  // }
}
