import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/User';
import {UserService} from '../user.service';
import {Recipe} from '../models/Recipe';
import {RecipeService} from '../recipe.service';
import {Review} from '../models/Review';
import {DatePipe} from '@angular/common';
import {Report} from '../models/Report';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  isLoggedIn: boolean;
  err: any = {};
  isReviewAvailable: boolean;
  review: any = {};
  reviews:any = [];
  report:any = {};
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
    this.getAllReview();
    // this.review = new Review();

    this.getRecipe();
  }

  getAllReview() {
    this.userService.getReview().subscribe(
      res => {
        this.reviews = res;
        console.log('test', this.reviews);
      }, err => {
        console.log(err);
      });
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

  getReview(review: any){
    this.report.review_id = review.id;
    this.report.dateReported = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    console.log('review:',this.report); 
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

  addReport(): any{
    console.log('from add report: ',this.report)
    this.userService.addReport(this.report).subscribe(res => {
      this.report = res;
      location.reload();
    }, err => {
      console.log(err);
      this.err = err.error;
      console.log(this.err.msg);
      window.alert(this.err.msg);
    });
  }

}


