import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { Cart } from '../cart';
import { CartService } from "../cart.service"
import { HeaderComponent } from "../header/header.component";
import { ApiService } from "../api.service";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CartItemComponent,
    NgFor,
    CommonModule,
    HeaderComponent,
  ],
  template: `
  <app-header (searcher)="onSearch($event)"></app-header>
    <div class="container-fluid">
      <div *ngIf="(cartitems?.length || 0) === 0" 
      class="container-fluid row align-items-center justify-content-center p-4"
      style="min-height: 80vh;"> 
        <h1 class="text-center fs-4">No product available</h1>
      </div>
      <div *ngIf="(cartitems?.length || 0) > 0" class="p-4 row w-100 gap-1 justify-content-between">
        <div *ngFor="let item of cartitems" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 mb-sm-4">
            <app-cart-item [showAdd]="true" [cartItem]="item"></app-cart-item>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  public cartitems!: Cart[];
  constructor(private cartService: CartService, private apiService: ApiService) { }
  ngOnInit(): void {
    this.apiService.getProducts().subscribe((products: { success: boolean, products: Cart[] }) => {
      this.cartitems = products?.products?.map((products) => ({ ...products, quantity: 1 }));
    })
  }
  onSubmit() {

  }
  onSearch(search: string) {
    this.apiService.searchProducts(search).subscribe((products: { success: boolean, products: Cart[] }) => {
      this.cartitems = products.products;
    })
  }
}