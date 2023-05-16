import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Cart } from '../cart';
import { CartService } from '../cart.service';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from "../api.service";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, RouterOutlet,HeaderComponent],
  template: `
  <app-header></app-header>
    <div class="container-fluid p-3 p-sm-5 d-flex flex-column flex-md-row gap-5 align-items-center">
      <img
        class="card-img-top"
        [ngSrc]="product.imageUrl"
        class="w-50 h-auto m-auto"
        priority
        width="512"
        height="512"
      />
      <div class="d-flex flex-column gap-3">
        <h6 class="card-title fw-bold fs-3">{{ product.name }}</h6>
        <p class="card-text">{{ product.description }}</p>
        <span class="card-text">$ {{ product.price || 0 }}</span>
        <div class="d-flex flex-column ">
          <small class="card-text">Rating: {{ getRating(product.rating) || 0 }}</small>
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
})
export class ProductDetailsComponent implements OnInit {
  public productid!: string;
  public product!: Cart;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private titleService: Title,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const productid = this.route.snapshot.params['id'];
    this.apiService.getOneProduct(productid).subscribe((product: { success: boolean, product: Cart | null }) => {
      console.log(product);
      product.product!.quantity = 1;
      this.product = product.product || { name: '', description: '', price: 0, rating: [0], imageUrl: '', _id: '' };
      this.titleService.setTitle(this.product.name);
    });
    this.addToHistory()
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
  addToHistory() {
    const productid = this.route.snapshot.params['id'];
    if (productid) {
      this.apiService.addHistory(productid).subscribe((product) => {
        console.log(product);
      });

    }
  }
}
