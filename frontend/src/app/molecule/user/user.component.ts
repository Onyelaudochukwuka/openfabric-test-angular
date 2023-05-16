import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "@app/atom/header/header.component";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { ApiService } from "@app/utils/api.service";
import { Cart } from "@app/cart";
import { CartItemComponent } from "@app/atom/cart-item/cart-item.component";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, RouterOutlet,CommonModule, HeaderComponent, CartItemComponent],
  template: `
  <app-header></app-header>
    <div class="container-fluid d-flex align-items-center justify-content-center" style="min-height: 80vh;">
    <div class="d-flex gap-5" *ngIf="!userName">
      <a routerLink="/register" type="button" class="btn btn-outline-primary">Register</a>
      <a routerLink="/login" type="button" class="btn btn-primary">Login</a>
    </div>
      <div *ngIf="userName" class="p-4">
        <h3>{{ userName }}</h3>
        <a type="button" class="btn btn-primary mb-4" (click)="logout()">Log Out</a>
        <div *ngIf="(history?.length || 0) > 0" class="row w-100 gap-1 justify-content-between">
        <div *ngFor="let item of history" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 mb-sm-4">
            <app-cart-item [showAdd]="true" [cartItem]="item"></app-cart-item>
        </div>
      </div>
      </div>
    </div>
  `
})
export class UserComponent implements OnInit {
  public userName!: string;
  public history!: Cart[];
  constructor(private apiService: ApiService, private router: Router, private titleService: Title,) { }
  ngOnInit(): void{
    this.getApi();
  }
  getApi() {
    this.apiService.getUser().subscribe(user => {
      user.user?.history.map((val) => ({ ...val, quantity: 1 }))
      this.titleService.setTitle(user.user.userName);
      this.history = user.user?.history;
      this.userName = user.user?.userName ?? '';
    });
  }
  logout() {
    this.apiService.logoutUser().subscribe(user => {
      if (user?.success) {
        this.router.navigate(['/']);
      }
    });
  }
}
