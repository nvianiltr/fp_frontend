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

  ngOnInit() {
  	this.signup = new Signup();  
  }

  register() {
     this.userService.register(this.signup).subscribe(
     	() => console.log('complete'),
        err => {
        console.error(err); alert('Login Unsuccesful');
        },
      () => {
        console.log('REgister Succesful'); alert('{{res.message}}');
      }
    );
 	}
 
}