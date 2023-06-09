import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from "@app/utils/api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div
      class="container-fluid row align-items-center justify-content-center p-4"
      style="min-height: 100vh;"
    >
      <form
        class="d-flex flex-column gap-3 col-12 col-sm-6 col-md-4"
        [formGroup]="loginForm"
        (ngSubmit)="onSubmit()"
      >
        <div>
          <label for="inputEmail" class="mb-1">Email</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            placeholder="Email"
            formControlName="email"
          />
        </div>
        <div>
          <label for="inputPassword" class="mb-1">Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            placeholder="Password"
            formControlName="password"
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary mb-3"
          [disabled]="!loginForm.valid"
        >
          Register
        </button>
    </form>
    </div>
  `
})
export class LoginComponent {
  public loginForm!: FormGroup;
  constructor(private apiService: ApiService, private router: Router) {
    this.createForm();
  }
  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onSubmit() {
    this.apiService.loginUser(this.loginForm.value).subscribe((res) => {
      console.log(res)
      if (!res.success) {
        alert(res?.error || "Something went wrong");
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
