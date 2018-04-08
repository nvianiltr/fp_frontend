import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService) {}

  canActivate() {
    if (this.userService.isLogin()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
