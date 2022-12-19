import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Item } from 'src/models/item';
import { HttpClient } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { MatDialog } from "@angular/material/dialog";
import { CartService } from 'src/services/cart.service';
import { DialogComponent } from '../dialog/dialog.component';
import { AuthService } from '@auth0/auth0-angular';

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
  public email : String;
  public name : String;


  constructor(private route: ActivatedRoute, 
    private http : HttpClient, 
    private cookie: CookieService, 
    private cartService: CartService,
    private box: MatDialog,
    private auth : AuthService ) 
    
    {

      let e : string;
      this.auth.user$.subscribe(s => { 
         this.email = s.nickname;
         e = s.nickname;
        console.log(this.email);
    });


    //The ID of the Product we want to be dispalyed, Its held in the URL
    let url_id  = this.route.snapshot.paramMap.get('id');

  
      let Payload = {
        id : url_id
     }
  
  
      //The URL Will hold the ID Value for the Product we are trying to get
      //So we will Send this ID to the Backend and it will give us back the product in return
      this.http
      .post<any>("https://localhost:7005/Products/Id", Payload)
      .subscribe((data) => {
        console.log("Data activated !");
        this.products = data;
        console.log(this.products[0].brand);


        //This is the JSON Object we will send to the Backend Server
        var i = {
          brand : this.products[0].brand,
          email : e
        }

        var p = 
        {
          email : e
        }

        localStorage.setItem('Username' , e);
        
        //Create a DB with the User's name if there isnt one already created
        http.post<any>("https://localhost:7005/User/CreateDB", i).subscribe();

        //Insert the Brand into the DB if its not already there
        http.post<any>("https://localhost:7005/User/CreateBrand", i).subscribe();

        //Increment the Value assoicated with the Brand
        http.post<any>("https://localhost:7005/User/UpdateBrand", i).subscribe();

        //Let get the Latest JSON File that has the Users Data tracked
        http.post<any>("https://localhost:7005/User/Data" , p).subscribe(data => {
          console.log("Received User Data !");
          console.log(data);

        })

      
      });

  
     }

  ngOnInit(): void {



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