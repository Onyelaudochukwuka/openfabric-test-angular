import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from "../cart.service";
import { Cart } from "../cart";
import { ApiService } from "../api.service";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf, ReactiveFormsModule],
  template: `
    <nav class="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-between container-fluid py-3 px-4 shadow-sm mb-3">
      <a [routerLink]="['/']">
        <div class="header__logo"></div>
      </a>
      <div class="d-flex fs-4" style="flex-basis: 50%;width: 100%;gap: 20px;">
        <form (submit)="onSearch($event)" class="d-flex" role="search" style="flex-basis: 100%">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" [formControl]="search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <div class="d-flex gap-4 fs-4">
      <a routerLink="/user" class="d-flex gap-2 align-items-center" ><span class="fs-6" *ngIf="userName">{{ userName }}</span><i class="bi bi-person-circle"></i></a>
      <a routerLink="/cart" class="position-relative">
        <i class="bi bi-cart"></i>
        <span
          *ngIf="cartItems > 0"
          class="position-absolute start-100 translate-middle badge rounded-pill bg-danger text"
          style="font-size: 0.6rem;top: 9px;"
        >
          {{ cartItems }}
        </span>
      </a>
      </div>
      </div>
    </nav>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  value = 'Clear me';
  public cartItems: number = 0;
  public userName!:string;
  public searchControl = new FormControl();
  @Output() private searcher!: EventEmitter<string>;
  public search = new FormControl('');
  constructor(private cartService: CartService, private apiService: ApiService) {
    this.searcher = new EventEmitter<string>();
   }
  ngOnInit(): void {
    this.getCartItems()
    this.getUserName()
  }
  getUserName() {
    this.apiService.getUser().subscribe(user => {
      this.userName = user.user?.userName ?? '';
    });
  }
  getCartItems(): void {
    this.cartService.getItems().pipe().subscribe(items => {
      this.cartItems = items?.reduce((acc, val: Cart) => (val?.quantity || 0) + acc, 0);
    })
  }
  onSearch(event: any) {
    event.preventDefault();
    this.searcher.emit(this.search.value ?? '');
  }
}
