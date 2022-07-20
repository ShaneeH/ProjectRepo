import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'store',component: StoreComponent },
  { path: 'cart', component: CartComponent },
  { path: 'test', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
