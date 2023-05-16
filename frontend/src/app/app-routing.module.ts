import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { CartComponent } from "./cart/cart.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    title: 'Product details'
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'cart'
  }
];

export default routes;
