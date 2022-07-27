import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './test/test.component';
import { AuthModule } from '@auth0/auth0-angular';
import {MatButtonModule} from '@angular/material/button';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from './navbar/navbar.component';
import { DialogComponent } from './dialog/dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    HomeComponent,
    CartComponent,
    TestComponent,
    NavbarComponent,
    DialogComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
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
