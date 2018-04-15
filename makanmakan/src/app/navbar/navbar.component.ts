import { Component, OnInit, Input } from '@angular/core';
import {UserService} from '../user.service';
import {RecipeService} from '../recipe.service';
import {NavigationEnd, Router} from '@angular/router';
import {User} from '../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, private recipeService: RecipeService, private router: Router) {

    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });

  }

  @Input() name: string;
  isLoggedIn: boolean;
  tags: any = [];
  user: User;


  ngOnInit() {
    this.isLogin();
    this.getTags();
  }

  isLogin() {
    // console.log(this.userService.isLogin());
    this.isLoggedIn = this.userService.isLogin();

    if(this.userService.isLogin()) {
      this.user = this.userService.getUser();
    }
  }

  getTags() {
    this.recipeService.getTags().subscribe(res => {
      this.tags = res;
    });
  }

  search() {
    this.router.navigate(['/search/'+this.name]);
  };

  logout() {
    this.userService.logout();
    this.isLoggedIn = false;
    location.reload();
  }

  openRecipeCollection() {
    this.router.navigate(['/user/'+this.user.id+'/recipe-collection']);
  }
  openPersonalArticle() {
    this.router.navigate(['/user/'+this.user.id+'/personal-article']);
  }
  openSavedRecipe() {
    this.router.navigate(['/user/'+this.user.id+'/saved-recipe']);
  }
}
