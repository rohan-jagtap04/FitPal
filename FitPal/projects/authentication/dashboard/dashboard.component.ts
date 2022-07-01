import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { AuthService } from 'shared/services/authorization/auth.service';
import { Loader } from "@googlemaps/js-api-loader";
import { Observable, of } from 'rxjs';
import { User } from 'shared/model/user';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  paymentHandler: any;
  searchTerm: string;
  searchTermEmpty: boolean;
  userProfileClicked: boolean;
  dbQueryData: any[];
  user: any;
  queryUser: any;
  @Output() goingToUserUIDEvent = new EventEmitter();

  constructor(public authService: AuthService, private cd: ChangeDetectorRef, private router: Router) {
    this.searchTerm = "";
    this.searchTermEmpty = false;
    this.userProfileClicked = true;
    this.dbQueryData = [];
  }

  ngOnInit(): void {
    this.invokeStripe();
    // this.authService.getAllUsersWithName("Roger").subscribe((res:any[]) => {
    //   this.dbQueryData = res;
    //   console.log(res);
    // });
  }

  toggleUserProfileClicked(){
    this.userProfileClicked = !this.userProfileClicked;
  }

  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51LE5hDI1vHz8Rd3vYNRaR01ICxKYAac8OdDiOGlORFcrPoXXWKzDDsG5jfOoaNhhHv4iluv6HRXB05notoGsUHhF00tDl6bpq5',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({stripeToken})
        alert('Stripe token generated!');
      }
    });

    paymentHandler.open({
      name: 'FreakyJolly',
      description: 'Buying a Hot Coffee',
      amount: amount * 100
    });
  }

  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51LE5hDI1vHz8Rd3vYNRaR01ICxKYAac8OdDiOGlORFcrPoXXWKzDDsG5jfOoaNhhHv4iluv6HRXB05notoGsUHhF00tDl6bpq5',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }

  signOut(){
    this.authService.SignOut();
  }

  changeTextInSearch(event: any){
    if(event.target.value !== ""){
      this.authService.getAllUsersWithName(event.target.value).subscribe((res:any[]) => {
        this.dbQueryData = res;
        console.log(res);

        if(res.length != 0){
          this.user = res[0];
        }else{
          this.user = null;
        }
      });
    }
  }

  goToUser(userUID: string){
    console.log(this.dbQueryData);
    if(this.dbQueryData != null){
      this.authService.setUser(this.dbQueryData[0]);
      AuthService.observedUser = this.dbQueryData[0];
      this.router.navigate(['user']);
    }else{
      alert(`Error with null user`);
    }

  }

}
