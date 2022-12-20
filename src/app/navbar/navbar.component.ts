import { Component, OnInit } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { CookieService } from "ngx-cookie-service";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  public basketSize: number;
  public admin: boolean = false;

  constructor(public auth: AuthService, public cookie: CookieService) {
    this.basketSize = Number(localStorage.getItem('basket_size'));
    console.log(this.basketSize);
    
    //Get Cookie that contains cart size to display in navbar
    

    //Check if User is Admin
    this.auth.user$.subscribe((s) => {
      if (s["role"] == "admin") {
        this.admin = true;
      }});
      
  }

  ngOnInit(): void {}
}