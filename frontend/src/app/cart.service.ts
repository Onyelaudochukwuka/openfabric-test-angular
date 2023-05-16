import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Cart } from "./cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carts = new BehaviorSubject<Cart[]>([]);
  constructor() { }
  addToCart(product: Cart) {
    const index = this.carts.value.findIndex((item) => item._id === product._id);
    if (index > -1) {
      this.carts.value[index].quantity! += 1;
      this.carts.next(this.carts.value);
      return;
    }
    this.carts.value.push(product);
    this.carts.next(this.carts.value);
    console.log(this.carts)
  }
  updateQuantity(product: Cart) {
    const index = this.carts.value.findIndex((item) => item._id === product._id);
    if (index > -1) {
      this.carts.value[index].quantity = product.quantity;
      this.carts.next(this.carts.value);
      return;
    }
  }
  getItems(): Observable<Cart[]> {
    return this.carts.asObservable();
  }
}