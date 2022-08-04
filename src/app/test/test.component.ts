import { Component, Inject, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/services/cart.service';
import { Item } from 'src/models/item';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';




@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;

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


  constructor(@Inject(DOCUMENT) public document: Document, private http: HttpClient, private cartService  : CartService ,
   public auth: AuthService, private cookieService: CookieService, private box : MatDialog
    ) { 

     this.auth.user$.subscribe(s => {
      console.log(s);
      console.log(s['role']);      
      
     })
   // let name = "Hi Storage";
    localStorage.setItem('name', 'shane');

  
    this.http.get<any>('https://localhost:7005/Users/All').subscribe(data => { 
      this.users=data
    
   });

   this.filter();
   for(let i = 0; i < this.cartService.UData.length; i++){


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

 TestEmail(){
  let Payload = {
    name : "Jones",
    amount : 2300,
    items_amount : 2
 }

  let JSON_payload = JSON.stringify(Payload);
  console.log(JSON_payload);
  console.log(Payload);

  console.log(typeof(Payload));
  try {
    this.http.post<JSON>("https://localhost:7005/Mail", Payload).subscribe(data => {
      console.log(data);
  });
    
    console.log("success");
  } catch (error) {
    console.log("error");
  }
  
  
 }

 openDialog(){

  this.box.open(DialogComponent);
  setTimeout(() => {
    this.box.closeAll();
  }, 500);


 }

 cookies(){
  console.log("Cookie button pressed");
  let x = document.cookie;
  console.log("your cookie" , x);
 }


 getCookies(){

  let test = this.cookieService.get('cart_items');
  console.log("Using New Service");
  let jtest = JSON.parse(test);


 }

 deleteCookies(){
  this.cookieService.deleteAll();
  window.localStorage.removeItem('Cart_Items');
  location.reload();
  
 }

 

}
