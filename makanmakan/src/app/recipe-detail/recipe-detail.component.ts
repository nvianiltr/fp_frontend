import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/User';
import {UserService} from '../user.service';
import {Recipe} from '../models/Recipe';
import {RecipeService} from '../recipe.service';
import {Review} from '../models/Review';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  isLoggedIn: boolean;
  isReviewAvailable: boolean;
  @Input() review: Review;
  user: User;
  message: string;
  res: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private recipeService: RecipeService,
    private datepipe: DatePipe) {

    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
      this.user = this.userService.getUser();
    }
    else {
      this.isLoggedIn = false;
    }
  }

  ngOnInit() {
    this.review = new Review();
    this.getRecipe();
  }

  getRecipe(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipe(id)
      .subscribe(recipe => {
        this.recipe = recipe;
        if (this.recipe.reviews.length != 0) {
          this.isReviewAvailable = true;
        }
        else {
          this.isReviewAvailable = false;
        }
      });
  }

  search($name) {
    this.router.navigate(['/search/' + $name]);
  }

  addReviews(): void {
    this.review.recipe_id = this.recipe.id;
    this.review.datePosted = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.review.user_id = this.user.id;
    this.userService.addReview(this.review).subscribe(res => {
      this.review = res;
      location.reload();
    }, err => {
      console.log(err);
    });
  }

}


