import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Item } from 'src/models/item';
import { HttpClient } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { MatDialog } from "@angular/material/dialog";
import { CartService } from 'src/services/cart.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  private Id : String;
  product : Item;
  public products: Array<Item>;
  public cartTotal = 0;

  constructor(private route: ActivatedRoute, 
    private http : HttpClient, 
    private cookie: CookieService, 
    private cartService: CartService,
    private box: MatDialog ) { }

  ngOnInit(): void {

    let x  = this.route.snapshot.paramMap.get('id');
    console.log(x);

    let Payload = {
      id : x,
   }

    this.http
    .post<any>("https://localhost:7005/Products/Id", Payload)
    .subscribe((data) => {
      this.products = data;
    
    });


  }

  addToCart(item){


    //Store the Total Amount in a Cookie
    let CookieAmount = Number(this.cookie.get("TotalX"));
    let newCookieAmount = CookieAmount + item.price;
    this.cookie.set("TotalX", newCookieAmount);

    //Store the Cart Size in a Cookie
    let CartAmount = Number(this.cookie.get("CartX"));
    let newCartAmount = CartAmount + 1;
    this.cookie.set("CartX", newCartAmount.toString());

    //Store Cart Items in LocalStorage
    let myArray = [];
    let y = JSON.parse(window.localStorage.getItem("Cart_Items"));

    try {
      y.forEach((e) => {
        myArray.push(e);
      });
    } catch (error) {
      console.log(error);
    }

    myArray.push(item);
    window.localStorage.setItem("Cart_Items", JSON.stringify(myArray));
    document.cookie = `cart_size = ${this.cartService.CartData.length}`;
    this.cartTotal = this.cartTotal + item.price;
    document.cookie = `cart_total = ${this.cartTotal}`;


  }
 

}
