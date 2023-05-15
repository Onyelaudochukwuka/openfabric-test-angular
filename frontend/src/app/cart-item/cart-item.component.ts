import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Cart } from '../cart';
import { CartService } from "../cart.service";

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [NgFor, CommonModule],
  template: `
    <div class="card" style="width: fit-content;">
      <img
        class="card-img-top"
        src="https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/64/986649/1.jpg?6655"
        class="w-full"
      />
      <div class="card-body">
        <h6 class="card-title fw-bold fs-5">{{ cartItem.name }}</h6>
        <span class="card-text">$ {{ cartItem.price || 0 }}</span>
        <div class="d-flex flex-column">
          <small class="card-text">{{ getRating(cartItem.rating) || 0 }}</small>
          <div class="d-flex gap-2 text-warning">
            <span *ngFor="let arr of [1, 2, 3, 4]"
              ><i class="bi bi-star-fill"></i
            ></span>
          </div>
        </div>
        <button class="btn btn-primary fs-6 mt-3" (click)="addToCart()">Add to Cart</button>
        <button class="btn btn-primary fs-6 mt-3" (click)="addToCart()">view products</button>
      </div>
    </div>
  `,
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  public rating!: number;
  @Input() public cartItem!: Cart;
  constructor(private cartService: CartService) {}
  getRating(ratingArr: number[] | undefined): number {
    let rating = 0;
    ratingArr?.forEach((item: number) => {
      rating += item;
    });
    return rating / (ratingArr?.length || 1);
  }
  addToCart(): void {
    this.cartService.addToCart(this.cartItem);
    console.log('ADDed')
  }
}
