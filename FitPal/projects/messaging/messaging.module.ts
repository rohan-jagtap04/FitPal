import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MessagingRoutingModule } from './messaging-routing.module';
import { MessagingComponent } from './messaging.component';

@NgModule({
  declarations: [
    MessagingComponent,
  ],
  imports: [
    CommonModule,
    MessagingRoutingModule,
    GoogleMapsModule
  ]
})
export class MessagingModule { }
