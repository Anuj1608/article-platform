import { Component, Input, Output, EventEmitter } from "@angular/core";

/**
 * Heart-icon like button with count display.
 * Disabled and visually inactive when the user is not authenticated.
 */
@Component({
  selector: "app-like-button",
  standalone: true,
  template: `
    <button
      type="button"
      (click)="handleClick()"
      [disabled]="!isAuthenticated"
      [title]="isAuthenticated ? (liked ? 'Unlike' : 'Like') : 'Log in to like'"
      class="flex items-center gap-1.5 text-sm transition-colors disabled:cursor-not-allowed"
      [class]="liked ? 'text-accent' : 'text-gray-500 hover:text-accent'"
    >
      <svg
        class="w-5 h-5"
        [attr.fill]="liked ? 'currentColor' : 'none'"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{{ count }}</span>
    </button>
  `,
})
export class LikeButtonComponent {
  /** Whether the current user has liked this item. */
  @Input() liked = false;
  /** Total like count to display. */
  @Input() count = 0;
  /** Whether the current user is authenticated. */
  @Input() isAuthenticated = false;
  /** Emitted when the button is clicked (only when authenticated). */
  @Output() toggle = new EventEmitter<void>();

  /** Emits toggle only when the user is authenticated. */
  protected handleClick(): void {
    if (this.isAuthenticated) {
      this.toggle.emit();
    }
  }
}
