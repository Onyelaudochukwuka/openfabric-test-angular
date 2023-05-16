import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { Cart } from '../cart';
import { CartService } from "../cart.service"
import { HeaderComponent } from "../header/header.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CartItemComponent,
    NgFor,
    CommonModule,
    HeaderComponent,
  ],
  template: `
  <app-header (searcher)="onSearch($event)"></app-header>
    <div class="container-fluid">
      <div class="p-4 row w-100">
        <div *ngFor="let item of cartitems" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 mb-sm-4">
            <app-cart-item [showAdd]="true" [cartItem]="item"></app-cart-item>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public searchControl = new FormControl();
  public cartitems!: Cart[];
  public defaultcartitems!: Cart[];
  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    this.defaultcartitems = [
      {
        name: 'Product 1',
        price: 100,
        imageUrl:
          'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/64/986649/1.jpg?6655',
        description: 'Product Description',
        rating: [5, 2, 3, 4],
        _id: '1',
        quantity: 1,
      },
      {
        name: 'Product 2',
        price: 100,
        imageUrl:
          'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/64/986649/1.jpg?6655',
        description: 'Product Description',
        rating: [5, 2, 3, 4],
        _id: '2',
        quantity: 1,
      },
      {
        name: 'Product 3',
        price: 100,
        imageUrl:
          'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/64/986649/1.jpg?6655',
        description: 'Product Description',
        rating: [5, 2, 3, 4],
        _id: '3',
        quantity: 1,
      },
      {
        name: 'Product 4',
        price: 100,
        imageUrl:
          'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/64/986649/1.jpg?6655',
        description: 'Product Description',
        rating: [5, 2, 3, 4],
        _id: '4',
        quantity: 1,
      },
      {
        name: 'Product 5',
        price: 100,
        imageUrl:
          'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/64/986649/1.jpg?6655',
        description: 'Product Description',
        rating: [5, 2, 3, 4],
        _id: '5',
        quantity: 1,
      },
      {
        name: 'Product 6',
        price: 100,
        imageUrl:
          'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/64/986649/1.jpg?6655',
        description: 'Product Description',
        rating: [5, 2, 3, 4],
        _id: '6',
        quantity: 1,
      },
    ];
    this.cartitems = this.defaultcartitems;
  }
  onSubmit() {
    console.log(this.searchControl.value);
  }
  onSearch(search: string) {
    this.cartitems = this.defaultcartitems.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    }
    );
  }
}
