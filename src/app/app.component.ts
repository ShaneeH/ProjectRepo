import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { AuthService } from '@auth0/auth0-angular';
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  
  //Set the Title to be displayed in the Browser Tab
  constructor(private titleService:Title) {
    this.titleService.setTitle("Mobile Direct");
  }
  
}


