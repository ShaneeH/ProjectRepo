import { Component, OnInit } from "@angular/core";
import { Item } from "src/models/item";
import { FormControl } from "@angular/forms";
import { CartService } from "src/services/cart.service";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { CookieCartService } from "src/shared/cookie-cart.service";
import { SharedDataService } from "src/shared/shared-data.service";
import { CookieService } from "ngx-cookie-service";
import { Observable, Subject } from 'rxjs';


@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.css", "./navstyle.scss", './sty.scss'],
})
export class StoreComponent implements OnInit {
  public cartSubject = new Subject<any>();

  public filters = [];
  public Sort = [];
  public itemName;
  public itemPrice;
  //public products : any;
  public Categories = [];
  public products: Array<Item>;

  public cartTotal = 0;

  public search : boolean = false;

  public searchedProducts: Array<Item>;

  public LatestProduct : Item;

  //When using frop-down you need to use form
  form = new FormControl();
  sortBy = new FormControl();
  search_box = new FormControl();

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private box: MatDialog,
    private cookie: CookieService,
    private c: CookieCartService,
    private share: SharedDataService
  ) {
    //Get Products from API
    this.http
      .get<any>("https://localhost:7005/Products/All")
      .subscribe((data) => {
        this.products = data;

      });
    //Get Categories from API
    this.http
      .get<any>("https://localhost:7005/Products/Brands")
      .subscribe((data) => {
        this.Categories = data;
      });
  }

  ngOnInit(): void {

    
   
  }

  filter() {
    //This is code for the First Dropdown Menu
    //Add user selection to array
    this.filters.length = 0;
    //const result : string[] = [];
    let b: string = this.form.value.toString();
    this.filters.push(b); //Filters is an array
   

    //This will reset the view if they have no options picked
    if (b.length < 1) {
      this.filters.length = 0;
    }

    //This is code for the Sort By Dropdown Menu
    this.Sort.length = 0;
    let c: string = this.sortBy.value.toString();
    this.Sort.push(c);

  }

  addToCart(item) {
    
    this.LatestProduct = item;
    this.share.LatestItem = this.LatestProduct;

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



    this.box.open(DialogComponent);
    setTimeout(() => {
      this.box.closeAll();
      location.reload();
    }, 26610);


    
  }

  onSubmit(event: any) {

    let x = event.target.player.value.toString();
    let Payload = {
      search : x,
   }

    this.http
    .post<any>("https://localhost:7005/Search", Payload)
    .subscribe((data) => {
      this.products = data;
  
    });

  }
}