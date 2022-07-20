import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/services/cart.service';
import { Item } from 'src/models/item';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';





@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public users : any;
  //public users: User[];
  public Shane: User;
  public u : Array<Item>;
  profileJson : string = null;


  postId:any;

  public MyData : any;

  //Profile Data from Auth0
  public userEmail : string;
  public verifiedEmail : boolean;


  constructor(@Inject(DOCUMENT) public document: Document, private http: HttpClient, private cartService  : CartService , public auth: AuthService
    ) { 

     this.auth.user$.subscribe(s => {
      console.log(s);
      
      console.log("identifier" , s['email'] , s['nickname'], s['app_metadata']);
     // this.userEmail = s.email;
      
     })
   // let name = "Hi Storage";
    localStorage.setItem('name', 'shane');

  
    this.http.get<any>('https://localhost:7005/Users/All').subscribe(data => { 
      this.users=data
      console.log(data); 

   });

   this.filter();
   for(let i = 0; i < this.cartService.UData.length; i++){
    console.log(this.u[i]);

  }
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(
      ((profile) => this.profileJson = JSON.stringify(profile,null,2))
    )
  }

  onClickSubmit(data:any) {
    var cmd_json = 
                {
                 CMD : "INSERT INTO ang_test.people (id,email,msg) VALUES (" + data.id + " , " + "'"+ data.email +"'" + " ," + "'"+ data.msg + "'" +" )",
                };
    
       console.log(cmd_json);
       this.http.post<any>('https://localhost:7005/Users/Create', cmd_json).subscribe(data => {
       this.postId = data.id;
       console.log(data);
   });
 }
  CreateOrder(data:any){
    let id = data.id;
    let email = this.userEmail;
    let amount = data.id;
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    let date = Date().toLocaleString();

               
    console.log(datetime);
   
    //let email = this.auth.getUser;
    console.log("POST ORDER DATA:");
    console.log('id:' , data.id);
    console.log('amount:' , data.amount);
    console.log('email:' , this.userEmail);
    console.log('created:' , datetime);

  }

 filter(){
  this.u =  [...new Set(this.cartService.CartData)];
 }

 cookies(){
  console.log("Cookie button pressed");
  let x = document.cookie;
  console.log("your cookie" , x);
 }


 getCookies(){
  //var storedAry = JSON.parse($.cookie('cart_items'));
  let Cookie = document.cookie
  .split('; ')
  .find(row => row.startsWith('cart_items='))
  ?.split('=')[1]
  console.log(JSON.parse(Cookie));
  let CookieJ = JSON.parse(Cookie);
  console.log(CookieJ[0]);
 }

 
}
