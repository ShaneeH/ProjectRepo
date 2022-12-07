import { _DisposeViewRepeaterStrategy } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router'
import { HttpClient } from "@angular/common/http";
import { AuthService } from '@auth0/auth0-angular';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  Total : Number;
  Email : String;
  Name : String;




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

}

  ngOnInit(): void {
  }

  test_json(){

     //Sending JSON Payload to the Backend for the Emailing Service
     let user_address = this.form.get('address');
     let user_email = this.Email;
     let total = this.Total;
 
         //The JSON with the Items from the Users Basket
         let x = localStorage.getItem('basket_final');

 
     let j = {
       "to": [
           {
               "email": user_email
           }
       ],
       "templateId": 1,
       "params": {
           "firstname": this.Name,
           "date": "05/12/2022",
           "address" : "mala",
           "total": total,
           "items": JSON.parse(x)
       },
       "headers": {
           "charset": "iso-8859-1"
       }
   };
 
   console.log(x);
   console.log(JSON.stringify(j));

   const httpOptions = {
    headers: new HttpHeaders({
      'accept' : 'application/json',
      'Content-Type':  'application/json',
       'api-key': 'Enter Api Key Here'

    })
  };

   this.http.post<any>('https://api.sendinblue.com/v3/smtp/email' ,j , httpOptions).subscribe(data => {
    console.log(data);
  })


 
 

  }
  confirm_purchase(){
     //Sending JSON Payload to the Backend for the Emailing Service
     let user_address = this.form.get('address');
     let user_email = this.Email;
     let total = this.Total;
 
         //The JSON with the Items from the Users Basket
         let x = localStorage.getItem('basket_final');





 
     let j = {
       "to": [
           {
               "email": user_email
           }
       ],
       "templateId": 1,
       "params": {
           "firstname": "Shane",
           "date": "05/12/2022",
           "total": total,
           "items": JSON.parse(x)
       },
       "headers": {
           "charset": "iso-8859-1"
       }
   };

   
 
   console.log(x);
   console.log(JSON.stringify(j));




  }



}
