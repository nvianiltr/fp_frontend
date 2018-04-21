import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { RecipeService } from './recipe.service';
import { ArticleService } from './article.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService,
    private recipeService: RecipeService,
    private articleService: ArticleService ) {}

  canActivate() {
    if (this.userService.isLogin()) {

      if(window.location.pathname.includes('update')){
        var _user_id = this.userService.getUser().id;
        var user_id;
        var id =  parseInt(window.location.href.substr(window.location.href.lastIndexOf('/') + 1));
        if(window.location.pathname.includes('article')){
          this.articleService.getArticleByID(id).subscribe(res => {user_id = res.user_id});
        }
        else if(window.location.pathname.includes('recipe')) {
          this.recipeService.getRecipe(id).subscribe(res => {user_id = res.user_id});
        }

        if(user_id==_user_id){
          return true;
        }
        else {
          this.router.navigate(['/home']);
          return false;
        }
      };
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
