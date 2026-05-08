import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

/**
 * Generic empty state placeholder shown when a list has no items.
 * Supports an optional action button.
 */
@Component({
  selector: 'app-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col items-center justify-center py-20 text-center">
      <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg
          class="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <p class="text-base font-semibold text-gray-600">{{ message }}</p>
      @if (subtitle) {
        <p class="text-sm text-gray-400 mt-1">{{ subtitle }}</p>
      }
      @if (actionLabel) {
        <button
          type="button"
          (click)="action.emit()"
          class="mt-5 px-4 py-2 bg-action-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          {{ actionLabel }}
        </button>
      }
    </div>
  `,
})
export class EmptyStateComponent {
  /** Primary empty-state message. */
  @Input() message = 'Nothing here yet';
  /** Optional secondary message. */
  @Input() subtitle: string | null = null;
  /** Optional label for an action button. */
  @Input() actionLabel: string | null = null;
  /** Emitted when the action button is clicked. */
  @Output() action = new EventEmitter<void>();
}
