import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {

    let p = 'tech,customer'
    let arr = [];
    //input.indexOf
    //boolean isFound = input.indexOf("Android") !=-1? true: false;

    arr.push(p);
    

    for (let i = 0; i<arr.length; i++){
      if(arr[0].indexOf('terh') !=-1){
         console.log("Contains")
      }
    }
   
  }

  onSubmit(){
    console.log("Submitted !");
    let x = this.checkoutForm.value;
    
    console.log(x); 
    
    

  }

}
