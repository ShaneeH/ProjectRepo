import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { Item } from 'src/models/item';
import { NodeWithI18n } from '@angular/compiler';
import { CookieService } from 'ngx-cookie-service';
import {render} from 'creditcardpayments/creditCardPayments'
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  

  public CartT : number;
  public Total : number;
  public DisplayTotal : any;
  public Itemz : Array<Item>;
  public Items : Array<Item>;
  public EmptyCart : boolean = false;
  handler:any = null;

  public AuthEmail : string;
  public AuthName : string;

  public Names : Array<String>;
  public word = "";
  public arr = [];


  constructor(public cookie: CookieService, public auth: AuthService, private http: HttpClient, private cookieService: CookieService) {

  
    
    this.CartT = Number(cookie.get('CartX'));
    this.Total = Number(cookie.get('TotalX'));
    let n = this.Total.toFixed(2);
    this.DisplayTotal = Number(n);

    let x = cookie.get('cart_items');
    
    this.Items = JSON.parse(localStorage.getItem('Cart_Items'));
    console.log(this.CartT);
    console.log(this.Total);
    console.log(this.Items);

    console.log("NAME LOOP : ");
    for(let i = 0; i < this.Items.length; i++){
          console.log(this.Items[i].name);
          this.arr[i] = this.Items[i].name;
  
    }

    this.auth.user$.subscribe(s => {
      this.AuthEmail = s.email
      this.AuthName = s.nickname
  })



    try {
      //this.Items = JSON.parse(cookie.get('ItemsX'));
    } catch (error) {
      console.error(error);
      //Error because the Concat or String Join is causing Invalid JSON
    
    }
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

  function getOccurrence(array, value) {

  }


   }

  ngOnInit(): void {
    this.loadStripe();
  }

  clearCart(){
    window.localStorage.removeItem('Cart_Items');
    this.EmptyCart = true;
    this.cookie.delete('CartX');
    this.cookie.delete('TotalX');
    
    
  }

   Unique(value, index, self) {
    return self.indexOf(value) === index;
  }

  pay(amount: any) {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51LSWTRC1xIXzbbOGwm6cSVtRgaC4UtAiUnOClJ5er6PPkzuJ2YOXmuFJjixsAiDUHDw9rfGOxV83XhgFkFZ0czzv00o8hAdeux',
      locale: 'auto',
      billingAddress: '',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        alert('Payment Confirmed');
        console.log("Payment Confirmed");       
      }
    
    });
 
    handler.open({
      name: 'Mobile Direct',
      description: 'Powered by Stripe ',
      amount: this.Total * 100,
      successUrl: 'https://www.youtube.com/',
      email: this.AuthEmail
    });


    var Payload = {
      "name" : this.AuthName,
      "amount" : this.Total,
      "items_amount" : this.CartT,
      "email" : this.AuthEmail
    }

    var Payload_Order  = {
      "email" : this.AuthEmail,
      "products" : this.arr.toString(),
      "total" : this.Total,
    }

    this.http.post<JSON>("https://localhost:7005/Mail", Payload).subscribe(data => {
      console.log(data);
  });

  this.http.post<JSON>("https://localhost:7005/Orders/New", Payload_Order).subscribe(data => {
    console.log(data);
});

  }

  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
            

          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }

}