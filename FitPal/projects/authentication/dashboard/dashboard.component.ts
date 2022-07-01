import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/authorization/auth.service';
import { Loader } from "@googlemaps/js-api-loader";
import { Observable, of } from 'rxjs';
import { User } from 'shared/model/user';

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

  constructor(public authService: AuthService, private cd: ChangeDetectorRef) {
    this.searchTerm = "";
    this.searchTermEmpty = false;
    this.userProfileClicked = true;
    this.dbQueryData = [];
    console.log("User Display Name: ", this.authService.userData);

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
      });
    }
  }

}
