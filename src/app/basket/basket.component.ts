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
  basket_size : number = 0;
  total_fixed : number = 0;
  promo_deductions : number = 0;
   

  //Promo Variables
  promo_active : boolean = false;
  discount_active : boolean = false;

  promo_invalid : boolean = false;
  Banner : boolean = true;

  user_email : string;
  user_name : string;
  
  //This is the Array for the Products
  display_products : Item_cart[] = [];

  //This is the Array with the Quantites set by the user
  display_products_final : Item_cart[] = [];

  //Form for User Entered Promo Code
  promoCode = new FormGroup({
    code: new FormControl('')
  });

  constructor(public auth: AuthService, private box: MatDialog,) { 


    //Get the Users Information from the Auth0 Service 
    this.auth.user$.subscribe(s => { 
      this.user_email = s.email;
      this.user_name = s.nickname;
  });


  //Get the Products from the Local Storage
    let y = JSON.parse(window.localStorage.getItem("Cart_Items"));

    try {
      y.forEach((e: any) => {
        this.products.push(e);        
      });
    } catch (error) {  console.log(error);}

    //We are using Local Storage to store the Users Product's
    //When the User clicks add to cart it will append that product to one long string
    //So this method is used to remove duplicates from that string

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


  //To get the Total amount of the Basket
  //We loop though the array of products and the price of them to the 'Total' Variable
  for(let i = 0; i < this.display_products.length; i++){
        let z = this.display_products[i].price * this.display_products[i].qty;
         this.total = this.total + z;
         this.total = Number(this.total.toPrecision(4));
  }

      this.total = Number(this.total.toPrecision(4));

      
    this.basket_size = this.display_products.length;

    let total_final = this.total * 1.10 + 10;
    this.total_fixed = Number(total_final.toPrecision(4));
   
     
  }

  ngOnInit(): void {


  }

  
  increase(i : Item_cart){
    //The Max Qty amount a User can have of one item is 10
    i.qty = i.qty + 1;
    this.total = this.total + i.price;

    if(i.qty > 10){
        i.qty = 10;
        this.total = this.total - i.price;
    }

 
  }

  
  banner(){
  // This value activates the Promo Banner on the page
    this.Banner = false;
  }

  decrease(i : Item_cart){
    //We cant let the Qty of a product be less than 0 
    i.qty = i.qty - 1;

    if(i.qty >= 1){
      this.total = this.total - i.price;
    }

    if (i.qty < 1){
          i.qty = 1;
    }

  }

  //If the User want to Remove an Item from the Cart
  remove(i : Item_cart){
    //First we get the Subtotal of that Items
    let x = i.price * i.qty;
    //Then Minus it from the Basket Total
    this.total = this.total - x; 

    this.display_products = this.display_products.filter(e => e.name != i.name);
    this.products = this.products.filter(e => e.name != i.name);
    window.localStorage.setItem("Cart_Items", JSON.stringify(this.products));
  }

  addPromo(){
    //This is where the User can get a discount
    //If a Promo is Valid we will activate a Boolean and Deduct the discount from the total amount
    let promo = this.promoCode.get('code').value;

    if(promo == 'santa'){
       this.shipping = 0;
       this.promo_active = true;
       this.promo_invalid = false;
       this.promo_deductions = this.promo_deductions + 10;
    } else {
       this.shipping = this.shipping;
       this.promo_invalid = true;
       this.promo_active = false;
    }

    if (promo == 'promo25'){
        let discount = this.total * .25;
        this.promo_deductions = discount;
        this.total = this.total - discount;
        this.promo_deductions = this.promo_deductions + discount;
        this.discount_active = true;
        this.promo_invalid = false
    }
  }

  checkout(){
    //This is to calculate shipping costs and other costs
    let total_amount = this.total * 1.10 + this.shipping;
    localStorage.setItem('final_amount', total_amount.toString());


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

    //Object Factory Create Items with 'Qty' added
    //We Need this to send back to the API 
    //This JSON Object will the be used for the Emailing Service API

    for(let i = 0; i < this.display_products.length; i++){
      var obj : Item_cart  = {
        name : this.display_products[i].name,
        price : this.display_products[i].price,
        brand: this.display_products[i].brand,
        desc: this.display_products[i].desc,
        type: this.display_products[i].type,
        img: this.display_products[i].img,
        qty : this.display_products[i].qty
      }
        this.display_products_final.push(obj);
}

     window.localStorage.setItem('basket_final' , JSON.stringify(this.display_products_final));


  }

}
