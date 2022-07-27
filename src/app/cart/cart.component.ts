import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { Item } from 'src/models/item';
import { NodeWithI18n } from '@angular/compiler';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  //Maybe set values to LocalStorage and Get them from Local Storage

  //Remember to add If Cart is Empty in the view
  
  
  public a = [];


  public CartTotal;
  public Cart : Array<Item>;
  public new : Item;
  public uElements : Array<Item>;
  public CartSize : number;
  public u : any;
  public CookieCart : [];


    //Arrays that hold the Product Names and Qty
    public Names = [];
    public Qty = [];


  public Obj = { ProductName: this.Names, Quantites: this.Qty };
  public f: any;
  public Obj2 = {
    ProductName: [],
    Quantites: []
  };

  public items : Array<Item>;

  
  constructor(public cartService: CartService, public cookie: CookieService) {


    

    this.items = JSON.parse(cookie.get('cart_items'));
    console.log(this.items);
    

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    this.Cart = this.cartService.CartData;
    this.CartSize = this.Cart.length;
    this.CartTotal = this.cartService.Total;
    
   //Sets all Unique Elements into a new array
   this.uElements = [...new Set(this.items)];

   var json_str = JSON.stringify(this.uElements);
  // document.cookie = 'mycookie' = json_str;


  //THIS IS LEGACY CODE 
  for (let i = 0; i < this.cartService.CartData.length; i++) {

    // This array will hold all the unique Product Names in the Array
    this.a.push(this.cartService.CartData[i].name);

  }

  var unique = this.a.filter(onlyUnique);

  //Array with all names
  this.Names = unique;

  for (let i = 0; i > this.Names.length; i++) {
    function getOccurrence(array, value) {

      return array.filter((v) => (v === value)).length;

    }
  }

  function getOccurrence(array, value) {

    return array.filter((v) => (v === value)).length;

  }

  for (let i = 0; i < this.Names.length; i++) {

    let occ = getOccurrence(this.a, this.Names[i]);
    this.Qty.push(occ);

  }


   }

  ngOnInit(): void {
  }

  clearCart(){
    console.log("Clear Cart")
    this.uElements.length = 0;
    this.CartTotal = 0;

    this.cartService.CartData.length = 0;
    this.cartService.Total = 0;
  }


   Unique(value, index, self) {
    return self.indexOf(value) === index;
  }

}
