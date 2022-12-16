import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import {MatButtonModule} from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from './navbar/navbar.component';
import { DialogComponent } from './dialog/dialog.component';
import { AdminComponent } from './admin/admin.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { ProfileComponent } from './profile/profile.component';
import { BasketComponent } from './basket/basket.component';
import { PaymentComponent } from './payment/payment.component';
import { DetailComponent } from './detail/detail.component';
import { ErrorComponent } from './error/error.component';
import { CompletedComponent } from './completed/completed.component';



@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    HomeComponent,
    NavbarComponent,
    DialogComponent,
    AdminComponent,
    ProfileComponent,
    BasketComponent,
    PaymentComponent,
    DetailComponent,
    ErrorComponent,
    CompletedComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    NgxPayPalModule,
    MatButtonModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-mwii895t.us.auth0.com',  
      clientId: 'j2vRGnVmUyB1d9AW6uPQ5MpiIS0qlU9W'
    }),
    
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
