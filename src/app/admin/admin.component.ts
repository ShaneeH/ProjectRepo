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
  
  //Declare Variables 
  public Orders : Array<Order>;
  public Amount : number;
  public Qty : number;
  public Admin : Boolean;
  public products: Array<Item>;

 

  //These are the Angular Forms we nee to use te Capture the User Data 
  //All this Data is converted into JSON Objects to be sent back to my API

  //Admins can create new Products so we use this form
  ProductForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    brand : new FormControl(''),
    desc : new FormControl(''),
    type : new FormControl(''),
    img : new FormControl('')
  });

  //Admins can delete a Product based of it's id
  DeleteForm = new FormGroup({
    id: new FormControl('')
  });

  //Admins can update the price of a exsisting Product using this Form
  UpdatePriceForm = new FormGroup({
    id: new FormControl(''),
    price : new FormControl('')
  });

 
  constructor(public cookie: CookieService, public auth: AuthService, private http: HttpClient, private cookieService: CookieService) {
          //Check for what Role the User is
          //We need to make sure the User is an Admin
          //This needs to be done before the Components are loaded in so we do this in the constructor
          this.auth.user$.subscribe(s => { 
            if(s['role'] == 'admin'){
               this.Admin = true;
            }
         
        });

    //Receive all Order Data from my Backend
    let url = "https://localhost:7005/Orders/All";
    this.http.get<any>(url).subscribe(data =>{
      this.Orders = data;
    });

    //Get the Total Cash Amount of these Orders
    let url2 = "https://localhost:7005/Orders/All/Amount";
    this.http.get<any>(url2).subscribe(data2 =>{
      this.Amount = data2.toFixed(2);
     
    });

    //Get the Total amount of Orders have been created
    let url3 = "https://localhost:7005/Orders/All/Quantity";
    this.http.get<any>(url3).subscribe(data3 =>{
      this.Qty = data3;
     
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

    let url = "https://localhost:7005/Products/Create";
    this.http.post<any>(url ,this.ProductForm.value).subscribe(data => {
    
  });

    }

    deleteProduct(){

      //This is the Method used for Deleting a Product
      let url = "https://localhost:7005/Product/Delete";
      this.http.post<any>(url ,this.DeleteForm.value).subscribe(data => {
        
    });

    }

    updatePrice(){
      //This is the Method used for Price Updating a Product
      let url = "https://localhost:7005/Products/UpdatePrice"
      this.http.post<any>(url ,this.UpdatePriceForm.value).subscribe(data => {
      ;
    });
      
      

    
    }
  }


