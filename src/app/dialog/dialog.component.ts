import { Component, OnInit } from '@angular/core';
import { Item } from 'src/models/item';
import { SharedDataService } from "src/shared/shared-data.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css', './sty.scss']
})
export class DialogComponent implements OnInit {

  public LatestItem : Item;
  public Reccomend : boolean = false;
  public Reccomended_Item : Array<Item>;
  public RandomItem : Item;

  constructor(shared : SharedDataService, private http: HttpClient) {
    this.LatestItem = shared.LatestItem;
    //We only Display Reccomended Items if the User Picks a phone
    if (this.LatestItem.type == 'PHONE'){
        this.Reccomend = true;
    }

    //Once the User Picks a Phone
    if(this.Reccomend == true){
    //We Send the Phone Brand to the API i.e {'SAMSUNG'}
      let Payload = { brand : this.LatestItem.brand };
      this.http.post<any>("https://localhost:7005/Products/Reccomend", Payload).subscribe(data => {
      this.Reccomended_Item = data;
    //The API Will execute a SQL Query then return a List of Accesories that match the Users Phone Brand
      let x = this.Reccomended_Item.length;   
      let y = Math.floor(Math.random() * x);
      this.RandomItem = this.Reccomended_Item[y];
    //We then display a Random Item from this Reccomended List to the User
  });

    }

   }

  ngOnInit(): void {
  }

  hey(){
    console.log("yo");
  }

}