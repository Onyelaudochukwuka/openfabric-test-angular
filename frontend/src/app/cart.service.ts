import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Cart } from "./cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carts = new BehaviorSubject<Cart[]>([
    {
      name: 'Product',
      price: 100,
      imageUrl:
        'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/64/986649/1.jpg?6655',
      description: 'Product Description',
      rating: [5, 2, 3, 4],
      _id: '1',
      quantity: 1,
    }
 ]);
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
  getItems(): Observable<Cart[]> {
    return this.carts.asObservable();
  }
}