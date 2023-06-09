import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "@app/atom/header/header.component";
import { CartService } from "@app/utils/cart.service";
import { Cart } from "@app/cart";
import { CartItemComponent } from "@app/atom/cart-item/cart-item.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CartItemComponent],
  template: `
  <app-header></app-header>
    <div class="container-fluid">
      <div *ngIf="cartitems.length === 0" 
      class="container-fluid row align-items-center justify-content-center p-4"
      style="min-height: 80vh;"> 
        <h1 class="text-center fs-4">No item in cart</h1>
      </div>
      <div class="p-4 row w-100 gap-4" *ngIf="cartitems.length > 0">
        <div *ngFor="let item of cartitems" class="col-6 col-md-3 mb-3 mb-sm-0">
            <app-cart-item [cartItem]="item" [quantity]="true"></app-cart-item>
        </div>
      </div>
    </div>
  `,
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) { }
  public cartitems!: Cart[];
  public defaultcartitems!: Cart[];
  ngOnInit(): void { 
    this.getCartItems()
  }
  getCartItems(): void {
    this.cartService.getItems().subscribe(items => {
      this.defaultcartitems = items;
      this.cartitems = items;
    }
    );
}
}
