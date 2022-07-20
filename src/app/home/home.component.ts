import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService, @Inject(DOCUMENT) public document: Document) {


    
   }

  ngOnInit(): void {

  }

}
