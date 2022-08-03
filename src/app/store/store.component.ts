import { Component, OnInit } from "@angular/core";
import { Item } from "src/models/item";
import { FormControl } from "@angular/forms";
import { CartService } from "src/services/cart.service";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import { CookieCartService } from "src/shared/cookie-cart.service";
import { CookieService } from "ngx-cookie-service";


@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.css", "./navstyle.scss"],
})
export class StoreComponent implements OnInit {
  public filters = [];
  public Sort = [];
  public itemName;
  public itemPrice;
  //public products : any;
  public Categories = [];
  public products: Array<Item>;

  public cartTotal = 0;

  //When using frop-down you need to use form
  form = new FormControl();
  sortBy = new FormControl();

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private box: MatDialog,
    private cookie: CookieService,
    private c: CookieCartService
  ) {
    //Get Products from API
    this.http
      .get<any>("https://localhost:7005/Products/All")
      .subscribe((data) => {
        this.products = data;
        console.log("API Call attempt :");
      });
    //Get Categories from API
    this.http
      .get<any>("https://localhost:7005/Products/Categories")
      .subscribe((data) => {
        this.Categories = data;
      });
  }

  ngOnInit(): void {
    console.log("ng on init");
  }

  filter() {
    //This is code for the First Dropdown Menu
    //Add user selection to array
    this.filters.length = 0;
    //const result : string[] = [];
    let b: string = this.form.value.toString();
    this.filters.push(b); //Filters is an array
    console.log(b);

    //This will reset the view if they have no options picked
    if (b.length < 1) {
      console.log("i is less than 2");
      this.filters.length = 0;
    }

    //This is code for the Sort By Dropdown Menu
    this.Sort.length = 0;
    let c: string = this.sortBy.value.toString();
    this.Sort.push(c);
    console.log("Sort by:", c);
    console.log("Yoo");
  }

  addToCart(item) {
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
        console.log(e);
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
    }, 610);

    location.reload();
  }
}
