import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from 'projects/authentication/authentication.module';
import { SignInComponent } from 'projects/authentication/sign-in/sign-in.component';
import { SignUpComponent } from 'projects/authentication/sign-up/sign-up.component';
import { ForgotPasswordComponent } from 'projects/authentication/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from 'projects/authentication/verify-email/verify-email.component';
import { DashboardComponent } from 'projects/authentication/dashboard/dashboard.component';
import { AuthService } from 'shared/services/authorization/auth.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { GoogleMapsModule } from '@angular/google-maps'
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    GoogleMapsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
