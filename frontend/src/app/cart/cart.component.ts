import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { CartService } from "../cart.service";
import { Cart } from "../cart";
import { CartItemComponent } from "../cart-item/cart-item.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CartItemComponent],
  template: `
  <app-header></app-header>
    <div class="container-fluid">
      <div class="p-4 row w-100 gap-4 justify-content-between">
        <div *ngFor="let item of cartitems" class="col-6 col-md-3 mb-3 mb-sm-0">
            <app-cart-item [cartItem]="item" [quantity]="true"></app-cart-item>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./cart.component.scss']
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
