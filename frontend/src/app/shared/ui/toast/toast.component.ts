import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ToastService } from '@/app/core/services/toast.service';

/**
 * Fixed top-right toast container. Reads from ToastService signal.
 * Auto-dismiss is handled by the service — this component only renders.
 */
@Component({
  selector: 'app-toast',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium min-w-64 max-w-sm animate-slide-in"
          [class]="toastBgClass(toast.type)"
        >
          <span class="flex-1">{{ toast.message }}</span>
          <button
            type="button"
            (click)="toastService.dismiss(toast.id)"
            class="opacity-75 hover:opacity-100 transition-opacity ml-1 text-base leading-none"
            aria-label="Dismiss"
          >
            &#x2715;
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes slide-in {
      from { transform: translateX(120%); opacity: 0; }
      to   { transform: translateX(0);   opacity: 1; }
    }
    .animate-slide-in { animation: slide-in 0.25s ease-out; }
  `],
})
export class ToastComponent {
  protected readonly toastService = inject(ToastService);

  protected toastBgClass(type: 'success' | 'error' | 'info'): string {
    if (type === 'success') return 'bg-green-500';
    if (type === 'error') return 'bg-red-500';
    return 'bg-blue-500';
  }
}
