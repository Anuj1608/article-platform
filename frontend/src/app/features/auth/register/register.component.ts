import { Component, signal, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "@/app/core/services/auth.service";
import { ErrorMessageComponent } from "@/app/shared/ui/error-message/error-message.component";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ErrorMessageComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div
        class="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
      >
        <h1 class="text-2xl font-bold text-brand mb-6 text-center">
          Create Account
        </h1>

        @if (error()) {
          <app-error-message
            [message]="error()!"
            [showRetry]="false"
            class="mb-4"
          />
        }

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Username</label
            >
            <input
              formControlName="username"
              type="text"
              autocomplete="username"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-action-primary"
              placeholder="johndoe"
            />
            @if (
              form.get("username")?.invalid && form.get("username")?.touched
            ) {
              <p class="text-red-600 text-xs mt-1">
                Username is required (max 50 characters)
              </p>
            }
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Email</label
            >
            <input
              formControlName="email"
              type="email"
              autocomplete="email"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-action-primary"
              placeholder="you@example.com"
            />
            @if (form.get("email")?.invalid && form.get("email")?.touched) {
              <p class="text-red-600 text-xs mt-1">Valid email is required</p>
            }
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Password</label
            >
            <div class="relative">
              <input
                formControlName="password"
                [type]="showPassword() ? 'text' : 'password'"
                autocomplete="new-password"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-action-primary"
                placeholder="Min 8 characters"
              />
              <button
                type="button"
                (click)="showPassword.set(!showPassword())"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                [attr.aria-label]="showPassword() ? 'Hide password' : 'Show password'"
              >
                @if (showPassword()) {
                  <!-- eye-off -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                } @else {
                  <!-- eye -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                }
              </button>
            </div>
            @if (
              form.get("password")?.invalid && form.get("password")?.touched
            ) {
              <p class="text-red-600 text-xs mt-1">
                Password must be at least 8 characters
              </p>
            }
          </div>

          <button
            type="submit"
            [disabled]="isLoading() || form.invalid"
            class="w-full py-2 bg-action-primary text-white text-sm font-medium rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            @if (isLoading()) {
              Creating account…
            } @else {
              Create Account
            }
          </button>
        </form>

        <p class="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <a
            routerLink="/login"
            class="text-action-primary hover:underline font-medium"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isLoading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly showPassword = signal(false);

  protected readonly form = this.fb.group({
    username: ["", [Validators.required, Validators.maxLength(50)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]],
  });

  protected onSubmit(): void {
    if (this.form.invalid) return;

    const { username, email, password } = this.form.getRawValue();
    this.isLoading.set(true);
    this.error.set(null);

    this.authService.register(username!, email!, password!).subscribe({
      next: () => this.router.navigate(["/login"]),
      error: (err: HttpErrorResponse) => {
        this.error.set(err.error?.error ?? "Registration failed. Please try again.");
        this.isLoading.set(false);
      },
    });
  }
}
