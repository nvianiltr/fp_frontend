import {Component, OnInit, Input} from '@angular/core';
import {Signup} from '../models/Signup';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
  }

  @Input() signup: Signup;
  error: String;
  message: String;
  res: any = {};
  isError: boolean;
  element: any;

  ngOnInit() {
    this.element = document.getElementById('saveButton');
    this.signup = new Signup();
    this.isError = false;
  }

  register() {
    this.element.classList.add('running');
    this.userService.register(this.signup).subscribe(
      res => {
        this.res = res;
        this.isError = false;
        this.router.navigate(['/login']);
        // this.message = this.res.message;
        // console.log(this.message);
      }, err => {
        this.res = err;
        this.isError = true;
        this.error = this.res.error.message;
        this.element.classList.remove('running');

        // console.log(this.message);
        // console.error(err); alert(this.res.error.message);
      }
    );
  }
}
