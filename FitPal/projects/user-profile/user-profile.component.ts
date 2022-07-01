import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/authorization/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfileClicked: boolean = true;
  user: any;

  constructor(public authService: AuthService) {
    this.user = AuthService.observedUser;
  }

  ngOnInit(): void {
  }

  toggleUserProfileClicked(){
    this.userProfileClicked = !this.userProfileClicked;
  }


}
