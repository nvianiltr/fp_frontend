import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Recipe } from '../models/Recipe';
import { RecipeService } from '../recipe.service';

import {HttpClient} from '@angular/common/http';
import { DatePipe, Location } from '@angular/common';
import { User } from '../models/User';
import { UserService } from '../user.service';
import {Review} from '../models/Review';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  isLoggedIn: boolean;
  isReviewAvailable: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private recipeService: RecipeService,
    private userService: UserService, private datepipe: DatePipe,
    private location: Location,
    private reviewService : ReviewService) {
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
    this.review = new Review();
  }

  getRecipe(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipe(id)
      .subscribe(recipe => {
        this.recipe = recipe;
        console.log(recipe);
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




  @Input() review: Review;


  user: User;
  message: string;
  res: any = {};

  addReviews():void{
    // this.user = this.userService.getUser();
    // this.review.user_id = this.user.id;
    // this.review.recipe_id = this.recipe.id;
    // this.review.datePosted = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    // this.reviewService.addReview(this.review).subscribe(res => {
    //   this.review = res;
    //   console.log(this.review);
    //   this.router.navigate(['/recipe/'+this.recipe.id]);
    //   location.reload();
    // }, err => {
    //   this.res = err;
    //    console.log(this.res);
    //   this.message = this.res.error.error;
    // });
    this.review.recipe_id = this.recipe.id;
    this.review.datePosted = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    console.log(this.review.content);
    this.reviewService.addReview(this.review).subscribe(res => {
      this.review = res;
      this.router.navigate(['/recipe/'+this.recipe.id]);
      location.reload();
    }, err => {
      console.log(err);
    });
  }

}


