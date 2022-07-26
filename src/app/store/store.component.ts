import { Component, OnInit } from '@angular/core';
import { Item } from 'src/models/item';
import {FormControl} from '@angular/forms';
import { CartService } from 'src/services/cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css' , './navstyle.scss']
})
export class StoreComponent implements OnInit {
  public types = ["Tech" , "Clothing"];
  public filters = [];
  public Sort = [];
  public itemName;
  public itemPrice;
  public products : any;

  //When using frop-down you need to use form
  form = new FormControl();
  sortBy = new FormControl();

  //Is of type Item
  public items: Item[];
  public iPhone : Item;
  public AirMax : Item;
  public GTA : Item;


  constructor(private cartService  : CartService, private http: HttpClient) { 


    //Get Products from API
    this.http.get<any>('https://localhost:7005/Products/All').subscribe(data => { 
      this.products=data
      console.log("API Call attempt :");
      console.log(data); 

   });

    //Push Seed Data to Items Array
    this.items = new Array<Item>();
    this.items.push(this.iPhone , this.AirMax , this.GTA);

    

  }

  ngOnInit(): void {
    console.log("ng on init");
  }

  filter(){

    // ITS BECAUSE THE OBJECTS FROM THE API HAVE NO CATEGORIES COLUMN !

    //This is code for the First Dropdown Menu
    //Add user selection to array
    this.filters.length = 0;
    //const result : string[] = [];
    let b: string = this.form.value.toString()
    this.filters.push(b); //Filters is an array
    console.log(b);

    //This will reset the view if they have no options picked
    if (b.length < 1){
      console.log("i is less than 2");
      this.filters.length = 0;
    }

    //This is code for the Sort By Dropdown Menu
    this.Sort.length = 0;
    let c: string = this.sortBy.value.toString()
    this.Sort.push(c);
    console.log("Sort by:" , c);
    console.log("Yoo");

  }

  addToCart(item){
    console.log("You added item to cart:");
    console.log(item);
    this.cartService.CartData.push(item);  
    //Adding to the Total Cart Amount
    this.cartService.Total = this.cartService.Total + item.price;
    let JSON_Cart = JSON.stringify(this.cartService.CartData);
    document.cookie = `cart_items = ${JSON_Cart}`;
    document.cookie = `cart_size = ${this.cartService.CartData.length}`;
    
    
  }

  

}
