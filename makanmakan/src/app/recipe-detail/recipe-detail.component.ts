import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Recipe } from '../models/Recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  isLoggedIn: boolean;
  isReviewAvailable: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });

    if(localStorage.getItem('token')){
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
  }

  ngOnInit() {
    this.getRecipe();
  }

  getRecipe(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipe(id)
      .subscribe(recipe => {
        this.recipe = recipe;
        if(recipe.reviews.length != 0) {
          this.isReviewAvailable = true;
        }
        else {
          this.isReviewAvailable = false;
        }
      });
  }
  search($name) {
    this.router.navigate(['/search/'+$name]);
  };

}


