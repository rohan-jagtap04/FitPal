import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/authorization/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  redirectOnSignUp(email: HTMLInputElement, password: HTMLInputElement){
    this.authService.SignUp(email.value, password.value).then(() => {
      this.router.navigate(['authentication/verify-email-address']).catch((err) => console.log(err));
    }).catch(err => {
      alert(`Error: ${err}`);
    });
  }

}
