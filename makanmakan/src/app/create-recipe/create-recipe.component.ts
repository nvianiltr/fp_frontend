import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { Recipe } from '../models/Recipe';
import { RecipeService } from '../recipe.service';
import { User } from '../models/User';
import { UserService } from '../user.service';
import * as $ from 'jquery';
import {HttpClient} from '@angular/common/http';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {

	@Input() recipe: Recipe;

  user: User;
  message: string;
  res: any = {};
  tags: any = [];

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private recipeService: RecipeService,
    private location: Location,
    private userService: UserService, private datepipe: DatePipe,
   private firebaseApp: FirebaseApp
  ) { }

  ngOnInit() {
  	this.getTags();
  }

  filename: string;
  selectedFile: File = null;

  getTags() {
    this.recipeService.getTags().subscribe(res => {
      this.tags = res;
    });
  }  

  // createUUID(){
  //   var dt = new Date().getTime();
  //   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  //     var r = (dt + Math.random()*16)%16 | 0;
  //     dt = Math.floor(dt/16);
  //     return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  //   });
  //   return uuid+'.jpg';
  // }

  // uploadImage() {
  //   this.selectedFile =<File> $('#image')[0].files[0];
  //   const fd = new FormData();
  //   fd.append('image',this.selectedFile, this.article.imageURL);
  //   this.http.post('https://us-central1-makanmakan-e28a1.cloudfunctions.net/uploadFile',fd).subscribe(res=>{console.log(res)});
  // }

  add() {
    // if($('#image')[0].files[0] == null){
    //   this.article.imageURL = "default.jpg";
    // }
    // else {
    //   this.article.imageURL = this.createUUID();
    //   this.uploadImage();
    // }
    this.user = this.userService.getUser();
    this.recipe.user_id = this.user.id;
    this.recipe.dateCreated = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.recipeService.addRecipe(this.recipe).subscribe(res => {
      this.recipe = res;
      console.log(this.recipe);
      this.router.navigate(['/article/'+this.recipe.id]);
      location.reload();
    }, err => {
      this.res = err;
       console.log(this.res);
      this.message = this.res.error.error;
    });

}

}
