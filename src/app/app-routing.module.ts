import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [

  { path: 'store',component: StoreComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
