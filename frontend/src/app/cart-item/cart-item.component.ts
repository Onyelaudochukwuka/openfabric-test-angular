import { Component, Input } from '@angular/core';
import { CommonModule, NgFor, NgOptimizedImage } from '@angular/common';
import { Cart } from '../cart';
import { CartService } from '../cart.service';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [NgFor, CommonModule, RouterLink, RouterOutlet, NgOptimizedImage],
  template: `
    <div class="card" style="width: fit-content;">
    <a [routerLink]="['/',cartItem._id]">
      <img
        class="card-img-top"
        ngSrc="https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/64/986649/1.jpg?6655"
        class="w-100 h-auto"
        priority
        width="300"
        height="300"
      />
      </a>
      <div class="card-body">
        <a [routerLink]="['/product',cartItem._id]"><h6 class="card-title fw-bold fs-5">{{ cartItem.name }}</h6></a>
        <span class="card-text">$ {{ cartItem.price || 0 }}</span>
        <div class="d-flex flex-column">
          <small class="card-text">{{ getRating(cartItem.rating) || 0 }}</small>
          <div class="d-flex gap-2 text-warning">
            <span *ngFor="let arr of [1, 2, 3, 4]"
              ><i class="bi bi-star-fill"></i
            ></span>
          </div>
        </div>
        <div *ngIf="quantity" class="d-flex gap-2">
          +
          <input [value]="cartItem.quantity" class="card-text" disabled/>
          -
        </div>                  
        <div class="d-flex gap-5">
          <button class="btn btn-primary fs-6 mt-3" (click)="addToCart()">
            Add to Cart
          </button>
          <a [routerLink]="['/product',cartItem._id]" class="btn btn-info text-white fs-6 mt-3">
            View
          </a>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  public rating!: number;
  @Input() public cartItem!: Cart;
  @Input() public quantity!: boolean;
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
    console.log('ADDed');
  }
}
