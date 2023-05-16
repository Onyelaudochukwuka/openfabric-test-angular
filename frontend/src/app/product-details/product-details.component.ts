import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Cart } from '../cart';
import { CartService } from '../cart.service';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, RouterOutlet,HeaderComponent],
  template: `
  <app-header></app-header>
    <div class="container-fluid p-3 p-sm-5 d-flex flex-column flex-md-row gap-5 align-items-center">
      <img
        class="card-img-top"
        ngSrc="https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/64/986649/1.jpg?6655"
        class="w-75 h-auto m-auto"
        priority
        width="512"
        height="512"
        style="max-height: 512px; max-width: auto;"
      />
      <div class="d-flex flex-column gap-3">
        <h6 class="card-title fw-bold fs-3">{{ product.name }}</h6>
        <p class="card-text">{{ product.description }}</p>
        <span class="card-text">$ {{ product.price || 0 }}</span>
        <div class="d-flex flex-column ">
          <small class="card-text">{{ getRating(product.rating) || 0 }}</small>
          <div class="d-flex gap-2 text-warning">
            <span *ngFor="let arr of [1, 2, 3, 4]"
              ><i class="bi bi-star-fill"></i
            ></span>
          </div>
        </div>
        <div class="d-flex gap-5">
          <button class="btn btn-primary fs-6 mt-3" (click)="addToCart()">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  public productid!: string;
  public product!: Cart;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.productid = this.route.snapshot.params['id'];
    this.product = {
      name: 'Product',
      price: 100,
      imageUrl:
        'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/64/986649/1.jpg?6655',
      description:
        'Product Description,Product DescriptionProduct DescriptionProduct DescriptionProduct DescriptionProduct DescriptionProduct DescriptionProduct DescriptionProduct Description',
      rating: [5, 2, 3, 4],
      _id: '1',
      quantity: 1,
    };
    this.titleService.setTitle(this.product.name);
  }

  getRating(ratingArr: number[] | undefined): number {
    let rating = 0;
    ratingArr?.forEach((item: number) => {
      rating += item;
    });
    return rating / (ratingArr?.length || 1);
  }
  addToCart(): void {
    this.cartService.addToCart(this.product);
    console.log('ADDed');
  }
}
