import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/authorization/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {



  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public redirectToDashboard(email: HTMLInputElement, password: HTMLInputElement){
    this.authService.SignIn(email.value, password.value).then(() => {
      this.router.navigate(['authentication/dashboard']).catch((err) => console.log(err));
    }).catch((err) => console.log(err));
  }

}
