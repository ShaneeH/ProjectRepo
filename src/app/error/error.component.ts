import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  //This Component is Displayed if the User is on a invalid URL
  //Displays an 404 Error Message !
  constructor() { }

  ngOnInit(): void {
  }

}
