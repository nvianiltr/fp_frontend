import { Component, OnInit, Input } from '@angular/core';
import { Signup } from '../models/Signup';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService) { }

  @Input() signup:Signup;
  message: String;
  res: any = {};

  ngOnInit() {
  	this.signup = new Signup();  
  }

  register() {
     this.userService.register(this.signup).subscribe(
     	res => {
         this.res = res;
         console.log('complete');
         window.alert(this.res.message);
       }, err => {
        console.error(err); alert();
        }
    );
 	}
 
}