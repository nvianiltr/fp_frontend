import { Component, OnInit } from '@angular/core';
import { Recipe } from "../models/Recipe";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  recipes: Recipe[] = [];
  name: string;
  isAvailable: boolean;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
     this.searchRecipe();
  }


  searchRecipe(): void {
   this.name = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
    this.recipeService.searchRecipe(this.name)
      .subscribe(recipe => {
        if(recipe.length == 0) {
          this.recipes = null;
          this.isAvailable = false;
        }
        else {
          this.isAvailable = true;
          this.recipes = recipe;
        }
      });
  }
}
