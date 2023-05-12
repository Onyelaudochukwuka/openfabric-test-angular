import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from "@angular/router";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatIconModule,
    MatInputModule,
  ],
  template: `
    <nav class="header">
      <a [routerLink]="['/']">
        <div class="header__logo"></div>
      </a>
      <mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="home"></mat-icon>
      <mat-form-field class="example-form-field">
  <mat-label>Clearable input</mat-label>
  <input matInput type="text" [()]="value">
  <button *ngIf="value" matSuffix mat-icon-button aria-label="Clear" (click)="value=''">
    <mat-icon>close</mat-icon>
  </button>
</mat-form-field>
    </nav>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  value = 'Clear me';
}
