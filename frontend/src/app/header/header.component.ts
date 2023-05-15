import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
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
        <form class="d-flex" role="search" style="flex-basis: 100%">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <div class="d-flex gap-4 fs-4">
      <i class="bi bi-person-circle"></i>
      <div type="button" class="position-relative">
        <i class="bi bi-cart"></i>
        <span
          *ngIf="cartItems > 0"
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger text"
        >
          {{ cartItems }}
        </span>
      </div>
      </div>
      </div>
    </nav>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  value = 'Clear me';
  public cartItems: number = 0;
  public searchControl = new FormControl();
  constructor() { }
  onSubmit() {
    console.log(this.searchControl.value);
  }
  ngOnInit(): void {
    this.cartItems = 0;
  }
}
