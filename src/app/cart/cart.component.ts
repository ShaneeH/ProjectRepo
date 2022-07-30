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


  public CartT : number;
  public Total : number;
  public Itemz : Array<Item>;
  public Items : Array<Item>;
  
  constructor(public cookie: CookieService) {

    this.CartT = Number(cookie.get('CartX'));
    this.Total = Number(cookie.get('TotalX'));
    let x = cookie.get('cart_items');

    this.Items = JSON.parse(localStorage.getItem('Cart_Items'));
    console.log(this.CartT);
    console.log(this.Total);
    console.log(this.Items);

  
   

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

   // return array.filter((v) => (v === value)).length;

  }


   }

  ngOnInit(): void {
  }

  clearCart(){

  }


   Unique(value, index, self) {
    return self.indexOf(value) === index;
  }

}
