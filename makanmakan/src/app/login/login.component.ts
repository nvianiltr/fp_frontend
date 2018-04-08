import { Component, OnInit, Input } from '@angular/core';
import { Login } from '../models/Login';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @Input() login: Login;
  message: String;
  res: any = {};

  constructor(private userService: UserService, private router: Router) {
  }


  ngOnInit() {
    this.login = new Login();
  }

  signIn(): void {
    this.userService.login(this.login).subscribe(
      res => {
        this.res = res;
        this.message = null;
        console.log(this.res);
        this.router.navigate(['']);
        location.reload();
      }, err => {
        this.res = err;
        console.log(this.res.error);
        this.message = this.res.error.error;
      });
  }
}
