import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router"
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiService } from "@app/utils/api.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div
      class="container-fluid row align-items-center justify-content-center p-4"
      style="min-height: 100vh;"
    >
      <form
        class="d-flex flex-column gap-3 col-12 col-sm-6 col-md-4"
        [formGroup]="registrationForm"
        (ngSubmit)="onSubmit()"
      >
        <div>
          <label for="userName" class="mb-1">userName</label>
          <input
            type="name"
            class="form-control"
            id="inputName"
            placeholder="userName"
            formControlName="userName"
          />
        </div>
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
          [disabled]="!registrationForm.valid"
        >
          Register
        </button>
      </form>
    </div>
  `,
})
export class RegisterComponent {
  public registrationForm!: FormGroup;
  constructor(private apiService: ApiService, private router: Router) {
    this.createForm();
  }
  createForm() {
    this.registrationForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  onSubmit() {
    this.apiService.registerUser(this.registrationForm.value).subscribe((res) => {
      if (!res.success) return alert(res.message);
      this.router.navigate(['/login'])
    })
  }
}
