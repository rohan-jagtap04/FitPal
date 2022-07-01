import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from 'shared/services/authorization/auth.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { GoogleMapsModule } from '@angular/google-maps'
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { MessagingModule } from 'projects/messaging/messaging.module'
import { StreamChatModule, StreamAutocompleteTextareaModule } from 'stream-chat-angular';
import { TranslateModule } from '@ngx-translate/core';
import { UserProfileModule } from 'projects/user-profile/user-profile.module';
import { AuthenticationModule } from 'projects/authentication/authentication.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    GoogleMapsModule,
    MessagingModule,
    UserProfileModule,
    AuthenticationModule,
    StreamChatModule,
    StreamAutocompleteTextareaModule,
    TranslateModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
