import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  total : number = 0;

    //This is the Form that will hold the Users Information

    
  form = this.fb.group({

    address: ['', [Validators.required, Validators.minLength(5)]],
    country: ['', [Validators.required]],
    card_name: ['', [Validators.required]],
    card_no: ['', [Validators.required, Validators.minLength(16) , Validators.maxLength(16)]],
    cvv: ['', [Validators.required, Validators.minLength(3) , Validators.maxLength(3)]],
    expire_month : ['', [Validators.required]],
    expire_year: ['', [Validators.required]]
    
 });

  constructor(private router: Router, private fb: FormBuilder) {
    this.total = Number(localStorage.getItem('final_amount'));


   }

  ngOnInit(): void {
  }

  confirm_purchase(){


    //We need to Send a JSON Object to the API


  }


}
