
import { Routes } from '@angular/router';
import { HomeComponent } from "@app/molecule/home/home.component";
import { ProductDetailsComponent } from "@app/molecule/product-details/product-details.component";
import { CartComponent } from "@app/molecule/cart/cart.component";
import { UserComponent } from "@app/molecule/user/user.component";
import { LoginComponent } from "@app/molecule/login/login.component";
import { RegisterComponent } from "@app/molecule/register/register.component";

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
  },
  {
    path: 'user',
    component: UserComponent,
    title: 'user'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'login'
  },
  {
    path: 'register',
    component: RegisterComponent,
  }
];

export default routes;
