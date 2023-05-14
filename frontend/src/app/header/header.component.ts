import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
  ],
  template: `
    <nav class="header">
      <a [routerLink]="['/']">
        <div class="header__logo"></div>
      </a>
    </nav>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  value = 'Clear me';
}
