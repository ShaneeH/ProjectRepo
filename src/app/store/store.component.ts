import { Component, OnInit } from '@angular/core';
import { Item } from 'src/models/item';
import {FormControl} from '@angular/forms';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css' , './navstyle.scss']
})
export class StoreComponent implements OnInit {


  public types = ["Tech" , "Clothing"];
  public filters = [];
  public itemName;
  public itemPrice;
 

  //When using frop-down you need to use form
  form = new FormControl();


  //Is of type Item
  public items: Item[];
  public iPhone : Item;
  public AirMax : Item;
  public GTA : Item;


  constructor(private cartService  : CartService) { 
    //Seed Data
    this.iPhone = new Item();
    this.iPhone.name = 'iPhone 11';
    this.iPhone.category = 'iPhone';
    this.iPhone.price = 850;
    this.iPhone.img = "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone11-red-select-2019_GEO_EMEA?wid=834&hei=1000&fmt=jpeg&qlt=95&.v=1567021767076";

    this.AirMax = new Item();
    this.AirMax.name = 'Galaxy S11';
    this.AirMax.category = 'Samsung';
    this.AirMax.price = 1000;
    this.AirMax.img = "https://www.thesun.co.uk/wp-content/uploads/2019/10/s1.jpg";

    this.GTA = new Item();
    this.GTA.name = 'One Plus 10T';
    this.GTA.category = 'One Plus';
    this.GTA.price = 700;
    this.GTA.img = "https://www.mytrendyphone.ie/images/OnePlus-10-Pro-128GB-Volcanic-Black-6921815619765-04042022-01-p.jpg"

    //Push Seed Data to Items Array
    this.items = new Array<Item>();
    this.items.push(this.iPhone , this.AirMax , this.GTA);
  }

  ngOnInit(): void {
  }

  filter(){
    //Add user selection to array
    this.filters.length = 0;
    const result : string[] = [];
    let b: string = this.form.value.toString()
    this.filters.push(b); //Filters is an array
    console.log(b);

    //This will reset the view if they have no options picked
    if (b.length < 1){
      console.log("i is less than 2");
      this.filters.length = 0;
    }
  }

  addToCart(item){
    
    console.log(item);
    this.cartService.sharedData.push(item);
    
   
  }

  

}
