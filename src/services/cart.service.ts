import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Injectable } from '@angular/core';
import { Item } from 'src/models/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  CartData: Array<Item>;
  Total = 0;
  UData : Array<Item>;
 
  

  constructor() {
    this.CartData = new Array<Item>();
    this.UData =  [...new Set(this.CartData)];
   
   }
}