import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { Item } from 'src/models/item';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/models/order';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public Orders : Array<Order>;

  constructor(public cookie: CookieService, public auth: AuthService, private http: HttpClient, private cookieService: CookieService) {
    let url = "https://localhost:7005/Orders/All";
    this.http.get<any>(url).subscribe(data =>{
      this.Orders = data;
    });



   }

  ngOnInit(): void {
  }

}
