import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public admin : boolean = false;
  public email : String;

  constructor(public auth: AuthService, @Inject(DOCUMENT) public document: Document, private http : HttpClient) {
    
    /**
     * This is the Home Page the first Page a User will see
     * 
     */
    
    //Check for what Role the User is
    this.auth.user$.subscribe(s => { 
      console.log(s); 
         if(s['role'] == 'admin'){
            this.admin = true;
         }
        
     });


   } 
  
  ngOnInit(): void {

  }

}
