import { Component, OnInit } from '@angular/core';
import { Item } from 'src/models/item';
import { Item_cart } from 'src/models/item_cart';
import {FormControl, FormGroup} from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { MatDialog } from "@angular/material/dialog";
import { PaymentComponent } from '../payment/payment.component';


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
  shipping : number = 10;
  _value : number = 1;
  promo_active : boolean = false;
  promo_invalid : boolean = false;
  user_email : string;
  user_name : string;
  Banner : boolean = true;


  display_products : Item_cart[] = [];

  promoCode = new FormGroup({
    code: new FormControl('')
  });

  constructor(public auth: AuthService, private box: MatDialog,) { 



    this.auth.user$.subscribe(s => { 
      this.user_email = s.email;
      this.user_name = s.nickname;

      console.log(s);
  });

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

  banner(){
    this.Banner = false;
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

  addPromo(){
    let promo = this.promoCode.get('code').value;

    if(promo == 'xmas22'){
       this.shipping = 0;
       this.promo_active = true;
       this.promo_invalid = false;
    } else {
       this.shipping = this.shipping;
       this.promo_invalid = true;
       this.promo_active = false;
    }
  }

  checkout(){



    let total_amount = this.total * 1.10 + this.shipping;
    localStorage.setItem('final_amount', total_amount.toString());
    console.log(total_amount);
    console.log("checkout");

    //Getting Attributes for the JSON Payload to sent to the backend
    //For The Emailing Service
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');

    var payload = {
      'total': total_amount,
      'email': this.user_email,
      'name' : this.user_name,
      'date' : utc
    }

    //Open up the Payment Platform
    //This is Timed so will close after a set amount of time

    this.box.open(PaymentComponent);
    setTimeout(() => {
      this.box.closeAll();
      location.reload();
    }, 266100);

  }

}
