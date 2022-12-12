import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Item } from 'src/models/item';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  private Id : String;
  product : Item;
  public products: Array<Item>;

  constructor(private route: ActivatedRoute, private http : HttpClient) { }

  ngOnInit(): void {

    let x  = this.route.snapshot.paramMap.get('id');
    console.log(x);

    let Payload = {
      id : x,
   }

    this.http
    .post<any>("https://localhost:7005/Products/Id", Payload)
    .subscribe((data) => {
      this.products = data;
    
    });


  }

 

}
