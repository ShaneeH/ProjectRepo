import { Component, OnInit } from '@angular/core';
import { AuthService } from "@auth0/auth0-angular";
import { Order } from 'src/models/order';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //Variables for User Profile
  AuthEmail : String;
  AuthName : String;
  AuthImg : String;
  AuthVerified : Boolean;

  OrderList : Array<Order>;


  constructor(public auth: AuthService, private http: HttpClient) {
    this.auth.user$.subscribe(s => {
      //Get User Data from Auth0 server
      this.AuthEmail = s.email
      this.AuthName = s.nickname
      this.AuthImg = s.picture
      this.AuthVerified= s.email_verified    

      let Payload = {
        email : this.AuthEmail
     }
    
     console.log(Payload);
      this.http
      .post<any>("https://localhost:7005/Orders/Email", Payload)
      .subscribe((data) => {
        this.OrderList = data;
        console.log(data);
      });
  })

  
   }

  ngOnInit(): void {
  }

}
