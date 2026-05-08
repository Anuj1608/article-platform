import { Component, Input, Output, EventEmitter } from "@angular/core";

/**
 * Error banner component shown when a data load or action fails.
 * Emits a retry event when the user clicks the Retry button.
 */
@Component({
  selector: "app-error-message",
  standalone: true,
  template: `
    <div
      class="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between"
    >
      <div class="flex items-center gap-3">
        <svg
          class="w-5 h-5 text-red-600 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="text-red-800 text-sm">{{ message }}</span>
      </div>
      @if (showRetry) {
        <button
          type="button"
          (click)="retry.emit()"
          class="text-sm font-medium text-red-700 hover:text-red-900 underline"
        >
          Retry
        </button>
      }
    </div>
  `,
})
export class ErrorMessageComponent {
  /** Error message to display. */
  @Input() message = "Something went wrong";
  /** Whether to show the Retry button. */
  @Input() showRetry = true;
  /** Emitted when the user clicks Retry. */
  @Output() retry = new EventEmitter<void>();
}
