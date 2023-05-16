import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, RouterOutlet,CommonModule, HeaderComponent],
  template: `
  <app-header></app-header>
    <div class="container-fluid d-flex align-items-center justify-content-center" style="min-height: 80vh;">
    <div class="d-flex gap-5">
      <a routerLink="/register" type="button" class="btn btn-outline-primary">Register</a>
      <a routerLink="/login" type="button" class="btn btn-primary">Login</a>
      </div>
    </div>
  `,
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor() { }

}
