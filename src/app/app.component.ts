import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{


  title = 'angularShop';
  public x : number;

  constructor(public auth: AuthService, public C : CartService){
    this.x = C.CartData.length;
    console.log(this.x);
  }

s
  ngOnChanges(changes: SimpleChanges ): void {
    throw new Error('Method not implemented.');
  }


}


