import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, private recipeService: RecipeService) { }

  isLoggedIn: boolean;
  tags: any = {};

  ngOnInit() {
    this.isLogin();
    this.getTags();
  }

  isLogin() {
    console.log(this.userService.isLogin());
    this.isLoggedIn = this.userService.isLogin();
  }

  getTags() {
    this.recipeService.getTags().subscribe(res => {
      console.log(res);
      console.log(res[0].tag_header[0].name);
      this.tags = res;
    });
  }
  
  logout() {
    this.userService.logout();
    this.isLoggedIn = false;
  }

}
