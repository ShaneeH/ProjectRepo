import { Component, OnInit } from '@angular/core';
import { Item } from 'src/models/item';
import { Item_cart } from 'src/models/item_cart';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {


  products : Item[] = [];
  products_Filtered : [] = [];
  unique : [] = [];
  total : number = 0;
  _value : number = 1;

  display_products : Item_cart[] = [];

  constructor() { 

    let myArray = [];
    let y = JSON.parse(window.localStorage.getItem("Cart_Items"));

    try {
      y.forEach((e: any) => {
        this.products.push(e);        
      });
    } catch (error) {  console.log(error);}

    var uniqueIds: any[] = [];

    var unique = this.products.filter(element => {
    const isDuplicate = uniqueIds.includes(element.name);
  
    if (!isDuplicate) {
      uniqueIds.push(element.name);
  
      return true;
    }
  
    return false;
  });

  //Final Array
  this.products = unique;

  //Object Factory for Products to go into the Display Array
  for(let i = 0; i < this.products.length; i++){
        var obj : Item_cart = {
          name : this.products[i].name,
          price : this.products[i].price,
          brand: this.products[i].brand,
          desc: this.products[i].desc,
          type: this.products[i].type,
          img: this.products[i].img,
          qty : 1
        }
        this.display_products.push(obj);
  }


  for(let i = 0; i < this.display_products.length; i++){
        let z = this.display_products[i].price * this.display_products[i].qty;
         this.total = this.total + z;
  }

  console.log(this.total);

    
  }

  ngOnInit(): void {
  }

  increase(i : Item_cart){
    i.qty = i.qty + 1;
    this.total = this.total + i.price;

    if(i.qty > 10){
        i.qty = 10;
        this.total = this.total - i.price;
    }
  }

  decrease(i : Item_cart){
    i.qty = i.qty - 1;

    if(i.qty >= 1){
      this.total = this.total - i.price;
    }

    if (i.qty < 1){
          i.qty = 1;
    }
  }

  remove(i : Item_cart){
    let x = i.price * i.qty;
    this.total = this.total - x; 
    this.display_products = this.display_products.filter(e => e.name != i.name);
    this.products = this.products.filter(e => e.name != i.name);
    window.localStorage.setItem("Cart_Items", JSON.stringify(this.products));
  }

  hey(){
    console.log("ye");
  }

}
