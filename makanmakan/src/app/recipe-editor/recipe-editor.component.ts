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

  private user: User; // HOLDS CURRENT LOGGED IN USER'S DETAILS
  private _ingredients: Ingredient[] = new Array(); // HOLDS OLD INGREDIENTS' DETAILS
  private _tagDetails: any = new Array(); // HOLDS OLD TAG DETAILS

  @Input() recipe: Recipe;
  message: string = null; // HOLDS UNPROCESSABLE ENTITY MESSAGE. E.G.: WHEN USER LEFT NAME FIELD EMPTY, "THE NAME FIELD IS REQUIRED" WILL SHOW UP IN THE ALERT BOX
  selectedFile: File = null; // HOLDS FILE FOR RECIPE'S IMAGE THAT USER WANTS TO UPLOAD
  ingredients: Ingredient[] = new Array(); // HOLDS THE NEWEST INGREDIENTS' DETAILS
  tagDetails: any = new Array(); // HOLDS THE NEWEST TAG DETAILS
  servingUnits: string[] = ['select', 'person', 'people', 'serving', 'servings', 'cup', 'cups', 'quart', 'quarts', 'gallon', 'gallons', 'dozen', 'liter', 'liters'];
  ingredientUnits: string[] = ['g', 'grams', 'kg', 'bottle', 'bottles', 'box', 'boxes', 'can', 'cans', 'ounce', 'ounces', 'cup', 'cups', 'gallon', 'gallons', 'dozen', 'dozens', 'liter', 'liters', 'ml', 'milliliters', 'pound', 'pounds', 'tablespoon', 'tablespoons', 'teaspoon', 'teaspoons'];
  tags: any = []; // TAG OPTIONS
  element: any;

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
    this.element = document.getElementById("saveButton");
    this.getTags(); // GET TAG DETAILS FOR <SELECT> TAG
    this.user = this.userService.getUser(); // GET USER'S DETAILS

    /* IF USER IS CREATING NEW RECIPE */
    this.recipe = new Recipe();
    if (this.recipe.servingUnit == null) {
      this.recipe.servingUnit = 'select';
    }
    /* IF USER IS EDITING EXISTING RECIPE */
    this.route.params.subscribe(params => {
      var id = +params['id'];
      if (params.id != null) {
        this.recipeService.getRecipe(id).subscribe(recipe => {
          this.recipe = recipe;
          this.recipe.user_id = this.user.id;
          this.ingredients = this.recipe.ingredient_details;

          /* GET OLD INGREDIENTS - FOR COMPARING IT WITH NEWEST INGREDIENTS IF USER'S UPDATING THE INGREDIENTS LATER */
          this.recipeService.getIngredients(this.recipe.id).subscribe(res => {
            this._ingredients = res;
          });

          if (this.recipe.servingUnit == null) {
            this.recipe.servingUnit = 'select';
          }

          for (var i = 0; i < this.ingredients.length; i++) {
            if (this.ingredients[i].unit == null) {
              this.ingredients[i].unit = 'select';
            }
          }

          /* GET TAG DETAILS' ID FOR <SELECT> TAG*/
          var arr = new Array();
          for (var i = 0; i < this.recipe.tag_details.length; i++) {
            arr.push(this.recipe.tag_details[i].tag_id);
          }
          this._tagDetails = arr.map(function (e) {
            return e.toString();
          });
          /* SET SELECTED RECIPE'S TAG DETAILS */
          $('#recipeDetails').val(arr);

          /* SET UPLOADED IMAGE PATH  */
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

  /* GET TAG DETAILS FOR <SELECT> TAG */
  getTags() {
    this.recipeService.getTags().subscribe(res => {
      this.tags = res;
    });
  }

  /* CREATE UUID FOR RECIPE'S IMAGE PATH SO IT DOESN'T OVERWRITE ANOTHER IMAGE WITH THE SAME ID IN FIREBASE STORAGE */
  createUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid + '.jpg';
  }

  /* SET SELECTED IMAGE PATH TO <p> WITH ID 'filename' IF USER SELECTED AN IMAGE FILE */
  onFileSelected() {
    $(document).ready(function () {
      $('p#filename').text($('#image')[0].files[0].name);
    });
  }

  /* UPLOAD AN IMAGE TO FIREBASE STORAGE AND RETURNS ITS URL IN FIREBASE STORAGE */
  uploadImage() {
    return new Promise((resolve) => {
      var _url: string;
      var temp = this.createUUID();
      this.selectedFile = <File> $('#image')[0].files[0];
      const fd = new FormData();
      fd.append('image', this.selectedFile, temp);
      this.http.post('https://us-central1-makanmakan-e28a1.cloudfunctions.net/uploadFile', fd)
        .subscribe(res => {
            // console.log(res);
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

  /* ADD AN INGREDIENT TO 'ingredients' ARRAY */
  addIngredient() {
    /* VALIDATOR */
    var result = this.ingredients.filter(x => x.name === $('#_ingredientName').val());
    if (result.length != 0) {
      alert('You already input ' + $('#_ingredientName').val() + ' in your list of ingredients ❤');
    }
    else if ($('#_ingredientName').val().length == 0) {
      alert('The Name field is required ❤');
    }
    else if (($('#_ingredientQty').val() < 0) || ($('#_ingredientQty').val().length == 0)) {
      alert('Please insert a whole or decimal number such as 2 or 0.5 in Quantity field ❤');
    }
    else {
      var id = 1;
      if (this.ingredients.length != 0) {
        id = this.ingredients[this.ingredients.length - 1].id + 1;
      }
      var _ingredient = new Ingredient(id, $('#_ingredientName').val(), $('#_ingredientQty').val(), $('#_ingredientUnit').val());
      this.ingredients.push(_ingredient);
      //console.log(this.ingredients);
    }
  }

  /* REMOVE ONE SPECIFIC INGREDIENT FROM 'ingredients' ARRAY */
  deleteIngredient(name: string) {
    this.ingredients = $.grep(this.ingredients, function (o, i) {
      return o.name === name;
    }, true);
  }

  /* UPDATE INGREDIENT DETAILS FROM 'ingredients' ARRAY */
  editIngredient(id: number, status: boolean) {
    var index = this.ingredients.findIndex(x => x.id === id);
    var name = $('.ingredientName');
    var qty = $('.ingredientQty');
    var unit = $('.ingredientUnit');

    if (status) {
      var result = this.ingredients.filter(x => x.name === $(name[index]).val());
      if (result.length != 0) {
        alert('You already input ' + $('.ingredientName').val() + ' in your list of ingredients ❤');
        $(name[index]).val(this.ingredients[index].name);
      }
    }

    this.ingredients[index].name = $(name[index]).val();
    this.ingredients[index].quantity = $(qty[index]).val();
    this.ingredients[index].unit = $(unit[index]).val();
  }

  /* CALLING RECIPE SERVICE IF USER EITHER WANTS TO UPDATE OR CREATE A NEW RECIPE */
  setRecipe(status: string) {
    return new Promise((resolve) => {
      if (this.recipe.servingUnit == 'select') {
        this.recipe.servingUnit = null;
      }

      /* IF USER WANTS TO CREATE A NEW RECIPE */
      if (status === 'add') {
        this.recipe.user_id = this.user.id;
        this.recipe.dateCreated = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        this.recipeService.addRecipe(this.recipe).subscribe(res => {
          this.recipe = res;
          resolve(res);
        }, err => {
          // console.log(this.res);
          this.element.classList.remove("running");
          this.message = err.error.error;
          window.scrollTo(0, 0);
        });
      }
      /* THIS ONE IS FOR UPDATING EXISITING RECIPE */
      else {
        this.recipeService.updateRecipe(this.recipe, this.recipe.id).subscribe(res => {
          // console.log(res);
          this.recipe = res;
          resolve(res);
        }, err => {
          this.element.classList.remove("running");
          this.message = err.error.error;
          window.scrollTo(0, 0);
        });
      }
    });
  }

  /* ADDING NEW INGREDIENT TO INGREDIENTS DATABASE */
  updateIngredient(obj: any) {
    return new Promise((resolve) => {
      var _obj = {
        'name': obj.name
      };
      this.recipeService.addIngredients(_obj).subscribe(res => {
          obj.id = <number>res;
        }, () => {
        },
        () => {
          resolve(true);
        });
    });
  }

  /* THIS FUNCTION WILL CALL updateIngredient FUNCTION RECURSIVELY UNTIL ALL INGREDIENTS IN 'ingredients' ARRAY ARE ADDED TO INGREDIENTS TABLE */
  addIngredients(i) {
    return new Promise((resolve) => {
      if (i < this.ingredients.length) {
        this.updateIngredient(this.ingredients[i]).then(() => {
          resolve(this.addIngredients(i + 1).then(
            () => {resolve(true);}
            ));
        });
      }
      else {
        resolve(true);
      }
    });
  }

  /* FUNCTION TO UPDATE OR ADD NEW INGREDIENT DETAILS TO INGREDIENT_DETAILS TABLE */
  updateIngredientDetails(obj: any) {
    return new Promise((resolve) => {

      if (obj.unit == 'select') {
        obj.unit = null;
      }

      var _ingredient = {
        'recipe_id': this.recipe.id,
        'ingredient_id': obj.id,
        'quantity': obj.quantity,
        'unit': obj.unit
      };

      /*
      ** RETURNS AN ARRAY OF INGREDIENT OBJECT IF THE INGREDIENT IS ALREADY EXIST IN THE RECIPE BEFORE
      ** OTHERWISE, IT WILL RETURN AN EMPTY ARRAY IF IT IS A NEW INGREDIENT
      */
      var result = this._ingredients.filter(x => x.id === obj.id);

      /* ADD NEW INGREDIENT DETAILS TO INGREDIENT_DETAILS TABLE */
      if (result.length == 0) {
        this.recipeService.addIngredientDetails(_ingredient).subscribe(res => {
            // console.log(res);
          },
          (err) => {
            console.log(err);
          }, () => {
            resolve(true);
          });
      }
      /* UPDATE INGREDIENT DETAILS IN INGREDIENT_DETAILS TABLE */
      else {
        this.recipeService.updateIngredientDetails(_ingredient).subscribe(res => {
            // console.log(res);
          },
          (err) => {
            console.log(err);
          }, () => {
            resolve(true);
          });
      }
    });
  }

  /* THIS IS A RECURSIVE FUNCTION THAT WILL CALL updateIngredientDetals FUNCTION UNTIL ALL INGREDIENTS IN 'ingredients' ARRAY ARE ADDED TO INGREDIENT_DETAILS TABLE */
  addIngredientDetails(i) {
    return new Promise((resolve) => {
      if (i < this.ingredients.length) {
        this.updateIngredientDetails(this.ingredients[i]).then(() => {
          resolve(this.addIngredientDetails(i + 1).then(() => {
            resolve(true);
          }));
        });
      }
      else {
        resolve(true);
      }
    });
  }

  /*
  ** DELETE INGREDIENT DETAILS THAT IS NO LONGER EXIST IN THE RECIPE
  ** FROM INGREDIENT_DETAILS TABLE IN DB
  */
  deleteIngredientDetails(id) {
    return new Promise((resolve) => {
      this.recipeService.deleteIngredientDetails(id, this.recipe.id).subscribe(res => {
        },
        () => {
        },
        () => {
          resolve(true);
        });
    });
  }

  /*
  ** THIS IS A RECURSIVE FUNCTION THAT WILL CALL deleteIngredientDetails FUNCTION
  ** IF THERE IS AN INGREDIENT IN '_ingredients' ARRAY (OLD INGREDIENTS)
  ** THAT IS NOT IN 'ingredients' ARRAY (UPDATED INGREDIENTS)
  */
  deleteIngredients(i: number) {
    return new Promise((resolve) => {
      if (i < this._ingredients.length) {
        var result = this.ingredients.filter(x => x.id === this._ingredients[i].id);
        if (result.length == 0) {
          this.deleteIngredientDetails(this._ingredients[i].id).then(() => {
            resolve(this.deleteIngredients(i + 1).then(() => {
              resolve(true);
            }));
          });
        }
        else {
          this.deleteIngredients(i + 1).then(() => {
            resolve(true);
          });
        }
      }
      else {
        resolve(true);
      }
    });
  }

  /*
  ** DELETE TAG DETAILS THAT IS NO LONGER EXIST IN THE RECIPE
  ** FROM TAG_DETAILS TABLE IN DB
  */
  deleteTagDetails(id) {
    return new Promise((resolve) => {
      this.recipeService.deleteTagDetails(id, this.recipe.id).subscribe(res => {
        },
        () => {
        },
        () => {
          resolve(true);
        });
    });
  }

  /*
  ** THIS IS A RECURSIVE FUNCTION THAT WILL CALL deleteTagDetails FUNCTION
  ** IF THERE IS A TAG IN '_tagDetails' ARRAY (OLD TAGS)
  ** THAT IS NOT IN 'tagDetails' ARRAY (UPDATED TAGS)
  */
  deleteTags(i: number) {
    return new Promise((resolve) => {
      if (i < this._tagDetails.length) {
        var result = this.tagDetails.includes(this._tagDetails[i]);
        if (!result) {
          this.deleteTagDetails(this._tagDetails[i]).then(() => {
            resolve(this.deleteTags(i + 1).then(() => {
              resolve(true);
            }));
          });
        }
        else {
          this.deleteTags(i + 1).then(() => {
            resolve(true);
          });
        }
      }
      else {
        resolve(true);
      }
    });
  }

  /* FUNCTION TO ADD NEW TAG DETAILS TO TAG_DETAILS TABLE */
  updateTagDetails(obj: any) {
    return new Promise((resolve, reject) => {
      var result = this._tagDetails.includes(obj);
      if (!result) {
        var _obj = {
          'recipe_id': this.recipe.id,
          'tag_id': obj
        };
        this.recipeService.addTagDetails(_obj).subscribe(res => {
          }, () => {
          },
          () => {
            resolve(true);
          });
      }
      else {
        resolve(true);
      }
    });
  }

  /* THIS IS A RECURSIVE FUNCTION THAT WILL CALL updateTagDetails FUNCTION UNTIL ALL TAGS IN 'tagDetails' ARRAY ARE ADDED TO TAG_DETAILS TABLE */
  addTags(i) {
    return new Promise((resolve, reject) => {
      if (i < this.tagDetails.length) {
        this.updateTagDetails(this.tagDetails[i]).then(() => {
          resolve(this.addTags(i + 1).then(() => {
            resolve(true);
          }));
        });
      }
      else {
        resolve(true);
      }
    });
  }

  /* WHEN USER CLICKS SAVE BUTTON */
  save() {
    this.element.classList.add("running");
    const p = new Promise((resolve, reject) => {
      if (this.ingredients.length == 0) {
        reject('Please enter ingredients ❤');
      }
      else if (($('#image')[0].files[0] == null && this.recipe.id == null) || this.recipe.title == null || this.recipe.preparation == null) {
        resolve('default.jpg');
      }
      else if ($('#image')[0].files[0] == null && this.recipe.id != null) {
        resolve(this.recipe.pictureURL);
      }
      else {
        resolve(this.uploadImage().then((res) => {
          resolve(res); // RETURNS THE FULL IMAGE URL IN FIREBASE STORAGE THAT WILL BE STORED IN DATABASE
        }));
      }
    });

    p.catch((res) => {
      this.message = res;
      this.element.classList.remove("running");
      window.scrollTo(0, 0);
    });

    p.then((res) => {
      this.recipe.pictureURL = res.toString();
      this.tagDetails = $('#recipeDetails').val();
    }).then(() => {
      /* IF USER IS CREATING A NEW RECIPE (makanmakan.me/create-recipe) */
      if (this.recipe.id == null) {
        this.setRecipe('add').then(() => {
          this.addIngredients(0).then(() => {
            this.addIngredientDetails(0).then(() => {
              if (this.tagDetails.length != 0) {
                this.addTags(0).then(() => {
                  document.body.style.cursor = '';
                  this.router.navigate(['/recipe/' + this.recipe.id]);
                });
              }
              else {
                document.body.style.cursor = '';
                this.router.navigate(['/recipe/' + this.recipe.id]);
              }
            });
          });
        });
      }
      /* IF USER IS UPDATING EXISTING RECIPE (makanmakan.me/update-recipe/{id}) */
      else {
        this.setRecipe('update').then(() => {
          this.addIngredients(0).then(() => {
            this.addIngredientDetails(0).then(() => {
              this.deleteIngredients(0).then(() => {
                if (this.tagDetails.length != 0) {
                  this.addTags(0).then(() => {
                    this.deleteTags(0).then(() => {
                      document.body.style.cursor = '';
                      this.router.navigate(['/recipe/' + this.recipe.id]);
                    });
                  });
                }
                else {
                  document.body.style.cursor = '';
                  this.router.navigate(['/recipe/' + this.recipe.id]);
                }
              });
            });
          });
        });
      }
    });
  }
}



