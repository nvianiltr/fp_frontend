import { Component, OnInit, Input } from '@angular/core';
import {UserService} from '../user.service';
import {RecipeService} from '../recipe.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, private recipeService: RecipeService, private router: Router) { }
  @Input() name: string;
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
      this.tags = res;
    });
  }

  search() {
    this.router.navigate(['/search/'+this.name]);
    location.reload();
  };


  logout() {
    this.userService.logout();
    this.isLoggedIn = false;
  }

}
