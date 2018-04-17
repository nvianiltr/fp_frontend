import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location, DatePipe} from '@angular/common';

import {Recipe} from '../models/Recipe';
import {RecipeService} from '../recipe.service';

import {User} from '../models/User';
import {UserService} from '../user.service';
import * as $ from 'jquery';
import {HttpClient} from '@angular/common/http';
import {FirebaseApp} from 'angularfire2';
import 'firebase/storage';
import {Ingredient} from '../models/Ingredient';

@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.css']
})

export class RecipeEditorComponent implements OnInit {

  @Input() recipe: Recipe;
  servingUnits: string[] = ['person', 'people', 'serving', 'servings', 'cup', 'cups', 'quart', 'quarts', 'gallon', 'gallons', 'dozen', 'liter', 'liters'];
  ingredientUnits: string[] = ['g', 'grams', 'kg', 'bottle', 'bottles', 'box', 'boxes', 'can', 'cans', 'ounce', 'ounces', 'cup', 'cups', 'gallon', 'gallons', 'dozen', 'dozens', 'liter', 'liters', 'ml', 'milliliters', 'pound', 'pounds', 'tablespoon', 'tablespoons', 'teaspoon', 'teaspoons'];
  user: User;
  tags: any = [];
  message: string = null;
  res: any = {};
  selectedFile: File = null;
  ingredients: Ingredient[] = new Array();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private location: Location,
    private http: HttpClient,
    private firebase: FirebaseApp,
    private userService: UserService,
    private datepipe: DatePipe) {
  }

  ngOnInit(): void {
    this.recipe = new Recipe();
    this.user = this.userService.getUser();
    this.getTags();
    this.route.params.subscribe(params => {
      var id = +params['id'];
      if (params.id != null) {
        this.recipeService.getRecipe(id).subscribe(recipe => {
          this.recipe = recipe;
          if (this.recipe.pictureURL != 'default.jpg') {
            var tempurl = this.recipe.pictureURL;
            tempurl = tempurl.substr(75, 40);
            $('p#filename').text(tempurl);
          }
          else {
            $('p#filename').text('No file chosen');
          }
        });
      }
    });
  }

  getTags() {
    this.recipeService.getTags().subscribe(res => {
      this.tags = res;
      $(document).ready(function () {
      });
    });
  }

  createUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid + '.jpg';
  }

  onFileSelected() {
    $(document).ready(function () {
      $('p#filename').text($('#image')[0].files[0].name);
    });
  }

  uploadImage() {
    return new Promise((resolve) => {
      var _url: string;
      var temp = this.createUUID();
      this.selectedFile = <File> $('#image')[0].files[0];
      const fd = new FormData();
      fd.append('image', this.selectedFile, temp);
        this.http.post('https://us-central1-makanmakan-e28a1.cloudfunctions.net/uploadFile', fd)
        .subscribe(res => {
            console.log(res);
          }, error => {
            console.log(error);
          },
          () => {
            var storage = this.firebase.storage();
            var storageRef = storage.ref();
            var spaceRef = storageRef.child(temp);
            spaceRef.getDownloadURL().then(function (url) {
              _url = url;
              resolve(_url);
            }).catch(function (error) {
              console.log(error);
            });
          });
    });
  }

  addIngredient() {
    var _ingredient = new Ingredient($('#_ingredientName').val(), $('#_ingredientQty').val(), $('#_ingredientUnit').val());
    this.ingredients.push(_ingredient);
  }

  deleteIngredient(name: string) {
    this.ingredients = $.grep(this.ingredients, function (o, i) {
      return o.name === name;
    }, true);
  }

  addRecipe() {
    return new Promise((resolve)=>{
      this.recipe.user_id = this.user.id;
      this.recipe.dateCreated = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
      this.recipeService.addRecipe(this.recipe).subscribe(res => {
        this.recipe = res;
        resolve(res);
      }, err => {
        this.res = err;
        // console.log(this.res);
        this.message = this.res.error.error;
        window.scrollTo(0, 0);
      });
    })
  }

  addIngredients() {
    return new Promise((resolve)=> {
      var _ingredientsID = new Array();
      for (var i = 0; i < this.ingredients.length; i++) {
        var obj = {
          'name': this.ingredients[i].name
        };
        this.recipeService.addIngredients(obj).subscribe(res => {
          _ingredientsID.push(res);
          console.log(_ingredientsID);
        },()=>{},
          ()=>{
            if (_ingredientsID.length == this.ingredients.length) {
              console.log('finished');
              resolve(_ingredientsID)
            }
          });
      }
    });
  }

  addIngredientDetails(IDs: any) {
    return new Promise((resolve) => {
      for (var i = 0; i < IDs.length; i++) {
        if(this.ingredients[i].unit == "select" ){
          this.ingredients[i].unit = null
        }

        var _ingredient = {
          'recipe_id': this.recipe.id,
          'ingredient_id': IDs[i],
          'quantity': this.ingredients[i].quantity,
          'unit': this.ingredients[i].unit
        };
        this.recipeService.addIngredientDetails(_ingredient).subscribe(res => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          },()=>{
            if (IDs.length == this.ingredients.length) {
              resolve()
            }
        })
      }
    })
  }

  addDetails() {
    return new Promise((resolve, reject) => {
      var details = $('#recipeDetails').val();
      var temp: any[] = null;
      if (details.length != 0) {
        for (var i = 0; i < details.length; i++) {
          var obj = {
            "recipe_id": this.recipe.id,
            "tag_id": details[i]
          };
          this.recipeService.addDetails(obj).subscribe(res=>{
            temp.push(res);
          });
          if(temp.length == details.length) {
            resolve(true)
          }
        }
      }
      else {
        resolve(true);
      }
    });
  }

  save() {
    if (this.recipe.id == null) {
      const p = new Promise((resolve, reject) => {
        if (this.ingredients.length == 0) {
          reject('Please enter ingredients <3');
        }
        else if ($('#image')[0].files[0] == null || this.recipe.title == null || this.recipe.preparation == null) { // tambahin if ingredients == null
          resolve('default.jpg');
        }
        else {
          resolve(this.uploadImage().then((res) => {
            resolve(res);
          }));
        }
      });

      p.catch((res) => {
        this.message = res;
        window.scrollTo(0, 0);
      });

      p.then((res) => {
        this.recipe.pictureURL = res.toString();
      }).then(() => {
        this.addRecipe().then(() => {
          this.addIngredients().then((res) => {
            this.addIngredientDetails(res).then(() => {
              this.router.navigate(['/recipe/' + this.recipe.id]);
            })
          })
        })
      })
    }
  }
}




//this.recipeService.addDetails().subscribe()
//      this.user = this.userService.getUser();
//  this.recipe.user_id = this.user.id;
// this.recipe.dateCreated = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
// const id = +this.route.snapshot.paramMap.get('id');
// this.recipeService.updateRecipe(this.recipe, id).subscribe(()=>this.goBack());
