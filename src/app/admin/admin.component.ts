import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { Item } from 'src/models/item';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/models/order';
import { ArgumentOutOfRangeError } from 'rxjs';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public Orders : Array<Order>;
  public Amount : number;
  public Qty : number;


  constructor(public cookie: CookieService, public auth: AuthService, private http: HttpClient, private cookieService: CookieService) {
    let url = "https://localhost:7005/Orders/All";
    this.http.get<any>(url).subscribe(data =>{
      this.Orders = data;
    });

    let url2 = "https://localhost:7005/Orders/All/Amount";
    this.http.get<any>(url2).subscribe(data2 =>{
      this.Amount = data2.toFixed(2);
      console.log(this.Amount);
    });

    let url3 = "https://localhost:7005/Orders/All/Quantity";
    this.http.get<any>(url3).subscribe(data3 =>{
      this.Qty = data3;
      console.log(this.Qty);
    });

  
   }

  ngOnInit(): void {
  }

}
