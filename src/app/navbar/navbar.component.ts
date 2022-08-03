import { Component, OnInit } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  public cartSize: number;
  public admin: boolean = false;

  constructor(public auth: AuthService, public cookie: CookieService) {
    //Get Cookie that contains cart size to display in navbar
    this.cartSize = Number(this.cookie.get("CartX"));

    this.auth.user$.subscribe((s) => {
      if (s["role"] == "admin") {
        this.admin = true;
      }});
      
  }

  ngOnInit(): void {}
}
