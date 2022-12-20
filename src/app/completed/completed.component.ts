import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {
  //No logic in this Component its just a View to display to the user 
  //Once they complete there Shopper Journey
  
  constructor() { }

  ngOnInit(): void {
  }

}
