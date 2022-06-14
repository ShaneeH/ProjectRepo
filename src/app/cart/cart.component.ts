import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { Item } from 'src/models/item';
import { NodeWithI18n } from '@angular/compiler';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public CartToal;
  public Cart : Array<Item>;
  public new : Item;

  constructor(private cartService: CartService) {

    for(let i = 0; i < this.cartService.sharedData.length; i++){

      /* this.new.name = this.cartService.sharedData[i].name;
      this.new.category = this.cartService.sharedData[i].category;
      this.new.price = this.cartService.sharedData[i].price;
      this.new.img = this.cartService.sharedData[i].img;
      this.Cart.push(this.new);
      console.log(this.Cart[i]); */
  }

   }

  ngOnInit(): void {
  }

}
