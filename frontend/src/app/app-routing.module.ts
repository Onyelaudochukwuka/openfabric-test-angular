
import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { CartComponent } from "./cart/cart.component";
import { UserComponent } from "./user/user.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

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
