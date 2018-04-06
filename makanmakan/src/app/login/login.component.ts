import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Login } from '../models/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }


  ngOnInit() {
  }

  login():void {
  	console.log('hello');
  }

}
