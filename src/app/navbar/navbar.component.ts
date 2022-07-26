import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public cartSize : number;

  constructor(public auth: AuthService, public cookie: CookieService) {
    //Get Cookie that contains cart size to display in navbar
    let x = cookie.get('cart_size');
    this.cartSize = Number(x);
 

   }

  ngOnInit(): void {
  }

}
