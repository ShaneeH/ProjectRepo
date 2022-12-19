import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { Item } from 'src/models/item';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/models/order';
import { ArgumentOutOfRangeError } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public Orders : Array<Order>;
  public Amount : number;
  public Qty : number;
  public Admin : Boolean;
  public products: Array<Item>;

 


  ProductForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    brand : new FormControl(''),
    desc : new FormControl(''),
    type : new FormControl(''),
    img : new FormControl('')
  });

  DeleteForm = new FormGroup({
    id: new FormControl('')
  });

  UpdatePriceForm = new FormGroup({
    id: new FormControl(''),
    price : new FormControl('')
  });


  constructor(public cookie: CookieService, public auth: AuthService, private http: HttpClient, private cookieService: CookieService) {
          //Check for what Role the User is
          this.auth.user$.subscribe(s => { 
            if(s['role'] == 'admin'){
               this.Admin = true;
            }
            console.log(s);
        });


    let url = "https://localhost:7005/Orders/All";
    this.http.get<any>(url).subscribe(data =>{
      this.Orders = data;
    });

    let url2 = "https://localhost:7005/Orders/All/Amount";
    this.http.get<any>(url2).subscribe(data2 =>{
      this.Amount = data2.toFixed(2);
      console.log(this.Amount);
    });

    let url3 = "https://localhost:7005/Orders/All/Quantity";
    this.http.get<any>(url3).subscribe(data3 =>{
      this.Qty = data3;
      console.log(this.Qty);
    });

         //Get Products from API
         this.http
         .get<any>("https://localhost:7005/Products/All")
         .subscribe((data) => {
           this.products = data;
   
         });

  
   }

  ngOnInit(): void {
  }

  createProduct(){

    
    console.log(this.ProductForm.value);
     
    console.log("Button clicked");
    let url = "https://localhost:7005/Products/Create";

    this.http.post<any>(url ,this.ProductForm.value).subscribe(data => {
      console.log(data);
  });

    }

    deleteProduct(){
      console.log(this.DeleteForm.value);
      let url = "https://localhost:7005/Product/Delete";

      this.http.post<any>(url ,this.DeleteForm.value).subscribe(data => {
        console.log(data);
    });

    }

    updatePrice(){
      let url = "https://localhost:7005/Products/UpdatePrice"
      this.http.post<any>(url ,this.UpdatePriceForm.value).subscribe(data => {
        console.log(data);
    });
      console.log(this.UpdatePriceForm.value);
      

    
    }
  }


