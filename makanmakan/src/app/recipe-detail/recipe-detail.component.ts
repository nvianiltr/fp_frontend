import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/User';
import {UserService} from '../user.service';
import {Recipe} from '../models/Recipe';
import {RecipeService} from '../recipe.service';
import {Review} from '../models/Review';
import {DatePipe} from '@angular/common';
import {Report} from '../models/Report';
import * as $ from 'jquery';
import {Ingredient} from '../models/Ingredient';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {

  recipe: Recipe = new Recipe();
  isLoggedIn: boolean;
  reviewErrorMessage: string = null ;
  reportedReviewErrorMessage: string = null;
  isReviewAvailable: boolean;
  review: Review = new Review();
  reviews: Review[] = new Array();
  tags: any[] = new Array();
  ingredients: Ingredient[] = new Array();
  report: Report = new Report();
  user: User = new User();
  isRecipeSaved: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private recipeService: RecipeService,
    private datepipe: DatePipe) {}

  ngOnInit() {
    this.getRecipe();
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
      this.user = this.userService.getUser();
      this.isSaved();
    }
    else {
      this.isLoggedIn = false;
    }
  }

  getRecipe(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipe(id)
      .subscribe(recipe => {
        this.recipe = recipe;
        this.tags = this.recipe.tag_details;
        this.ingredients = this.recipe.ingredient_details;
        if (this.recipe.reviews.length != 0) {
          this.isReviewAvailable = true;
          this.reviews = this.recipe.reviews;
        }
        else {
          this.isReviewAvailable = false;
        }
      });
  }

  search($name) {
    this.router.navigate(['/search/' + $name]);
  }

  addReview(): void {
    this.review.recipe_id = this.recipe.id;
    this.review.datePosted = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.review.user_id = this.user.id;
    this.userService.addReview(this.review).subscribe(res => {
      location.reload();
    }, err => {
      this.reviewErrorMessage = err.error.error;
      console.log(err);
    });
  }

  getReportedReview(review: any){
    this.reportedReviewErrorMessage = null;
    $('#thankYouMessage').html('');
    $('#reportReason').show();
    $('#reportReason').val("");
    $('#addReportButton').show();
    this.report.review_id = review.id;
    this.report.dateReported = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }

  addReport(): any{
    this.report.user_id = this.user.id;
    this.userService.addReport(this.report).subscribe(res => {

      this.reportedReviewErrorMessage = null;
      $('#thankYouMessage').html('Review has been reported. Our team will immediately check on that.');
      $('#reportReason').hide();
      $('#addReportButton').hide();
    }, err => {
      console.log(err);
      if(err.error.error === "The reason field is required."){
        this.reportedReviewErrorMessage = "Please input a valid reason ❤";
      }
      else{
        this.reportedReviewErrorMessage = "You have already reported this review. Please be patient ❤";
        $('#reportReason').hide();
        $('#addReportButton').hide();
      }
    });
  }

  saveRecipe() {
    var _obj = {
      'user_id': this.user.id,
      'recipe_id': this.recipe.id
    };
    this.recipeService.saveRecipe(_obj).subscribe(() => {this.isRecipeSaved = true});
  }

  isSaved() {
    var arr = new Array();
    this.recipeService.getSavedRecipes(this.user.id).subscribe(recipes => {
      arr = recipes;
    })
    var result = arr.filter(x => x.id == this.recipe.id);
    if(result.length == 0){
      this.isRecipeSaved = false;
    }
    else {
      this.isRecipeSaved = true;
    }
  }

  unsaveRecipe() {
    var _obj = {
      'user_id': this.user.id,
      'recipe_id': this.recipe.id
    };
    this.recipeService.removeSavedRecipe(_obj).subscribe(() => {this.isRecipeSaved = false});
  }
}


