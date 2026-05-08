import { Component, inject, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthGateService } from '@/app/core/services/auth-gate.service';

/**
 * Full-screen backdrop modal shown when an unauthenticated user tries to
 * like, dislike, comment, or reply. Offers Sign In / Create Account routes
 * and a Cancel button.
 */
@Component({
  selector: 'app-auth-gate-modal',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Backdrop -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      (click)="onBackdropClick($event)"
    >
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <!-- Card -->
      <div
        class="modal-card relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 flex flex-col items-center text-center"
      >
        <!-- Close button -->
        <button
          type="button"
          (click)="close()"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Icon -->
        <div class="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-5">
          <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>

        <!-- Heading -->
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Join to continue</h2>
        <p class="text-gray-500 text-sm leading-relaxed mb-7">
          Create a free account or sign in to like articles,<br />
          leave comments, and join the conversation.
        </p>

        <!-- Actions -->
        <div class="flex flex-col gap-3 w-full">
          <a
            routerLink="/register"
            (click)="close()"
            class="w-full py-3 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors"
          >
            Create a free account
          </a>
          <a
            routerLink="/login"
            (click)="close()"
            class="w-full py-3 rounded-full border border-gray-300 text-gray-800 text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Sign in
          </a>
          <button
            type="button"
            (click)="close()"
            class="text-sm text-gray-400 hover:text-gray-600 transition-colors mt-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  `,
})
export class AuthGateModalComponent {
  private readonly authGate = inject(AuthGateService);

  close(): void {
    this.authGate.close();
  }

  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.modal-card')) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }
}
