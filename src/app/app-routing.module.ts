import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { BasketComponent } from './basket/basket.component';
import { PaymentComponent } from './payment/payment.component';
import { DetailComponent } from './detail/detail.component';
import { ErrorComponent } from './error/error.component';
import { CompletedComponent } from './completed/completed.component';

const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'store',component: StoreComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'profile', component: ProfileComponent },
  {path : 'basket' , component: BasketComponent},
  {path : 'payment' , component: PaymentComponent},
  { path: 'product/:id', component: DetailComponent },
  { path: 'completed', component: CompletedComponent },
  { path: '**', component: ErrorComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
