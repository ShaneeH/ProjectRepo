import { Component, OnInit } from '@angular/core';
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  AuthEmail : String;
  AuthName : String;
  AuthImg : String;
  AuthVerified : Boolean;


  constructor(public auth: AuthService) {
    this.auth.user$.subscribe(s => {
      this.AuthEmail = s.email
      this.AuthName = s.nickname
      this.AuthImg = s.picture
      this.AuthVerified= s.email_verified
      console.log(s);
  })
   }

  ngOnInit(): void {
  }

}
