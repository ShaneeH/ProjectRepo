import { _DisposeViewRepeaterStrategy } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router'
import { HttpClient } from "@angular/common/http";
import { AuthService } from '@auth0/auth0-angular';
import { HttpHeaders } from '@angular/common/http';
import { Order_Data } from 'src/models/order_data';
import { Item } from 'src/models/item';




@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  Total : Number;
  Email : String;
  Name : String;
  public Order : Array<Order_Data>;
  public array : any[];
  public Items : Array<Item>;
  public arr = [];


   //This Form ensures that the User in inputting correct Data into the Payment Form
  form = this.fb.group({
    address: ['', [Validators.required, Validators.minLength(1)]],
    country: ['', [Validators.required]],
    cardName: ['', [Validators.required]],
    cardNo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    cvv: ['', [Validators.required]],
    expireYear: ['', [Validators.required]],
    expireMonth: ['', [Validators.required]]
 });

 constructor(private fb: FormBuilder, private route : Router, private http: HttpClient, public auth: AuthService) { 
  this.Total = Number(localStorage.getItem('final_amount'));

  this.auth.user$.subscribe(s => {    
    this.Email = s.email;
    this.Name = s.nickname;
});

var empty_string = '';

let arr = JSON.parse(localStorage.getItem('basket_final'));
for(let i = 0; i < arr.length; i++){
  var order =  { product_name : arr[i].name, product_qty : arr[i].qty };
  let o = JSON.stringify(order);


}

}

  ngOnInit(): void {

  }


  confirm_purchase(){


     //Sending JSON Payload to the Backend for the Emailing Service
     let user_address = this.form.get('address');
     let user_email = this.Email;
     let total = this.Total;
 
    //The JSON with the Items from the Users Basket
    let x = localStorage.getItem('basket_final');

        //This is the Object we Send the Email API Service
        //This lets us get todays Date and Format it Correctyl 
        let today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        let date_string  = today.toString();
        
        date_string = mm + '/' + dd + '/' + yyyy;
        


    //This is the JSON that will be send to Emailing Service with the Users Data inserted
     let j = {
       "to": [
           {
               "email": user_email
           }
       ],
       "templateId": 1,
       "params": {
           "firstname": this.Name,
           "date": date_string,
           "address" : "21 Sea View Lawns, Swords",
           "total": total.toFixed(2),
           "items": JSON.parse(x)
       },
       "headers": {
           "charset": "iso-8859-1"
       }
   };
 
   console.log(x);
   console.log(JSON.stringify(j));

   //Options For the Email Service
   const httpOptions = {
    headers: new HttpHeaders({
      'accept' : 'application/json',
      'Content-Type':  'application/json',
       'api-key': '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'

    })
  };

   //Sending all the Data to the Emailing API
   this.http.post<any>('https://api.sendinblue.com/v3/smtp/email' ,j , httpOptions).subscribe(data => {
    console.log(data);
  })


  //Now we Must Create the Order and Save it to our DataBase

  this.Items = JSON.parse(localStorage.getItem('Cart_Items'));

  for(let i = 0; i < this.Items.length; i++){
    console.log(this.Items[i].name);
    this.arr[i] = this.Items[i].name;

}

  var Payload_Order  = {
    "email" : user_email,
    "products" : this.arr.toString(),
    "total" : total.toFixed(2)
  }

  this.http.post<JSON>("https://localhost:7005/Orders/New", Payload_Order).subscribe(data => {
    console.log(data);
});



  //We wait a few seconds then Guide the user to the Completed Component 
  setTimeout(() => {
    this.route.navigate(['/completed']);
  
}, 3000);  //3s


  }



}
