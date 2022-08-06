import { Injectable } from '@angular/core';
import { Item } from "src/models/item";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  public LatestItem : Item;

  constructor() { }
}