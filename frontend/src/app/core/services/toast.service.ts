import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

/** Manages application-wide toast notification state. */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private counter = 0;
  readonly toasts = signal<Toast[]>([]);

  /** Shows a toast notification and auto-dismisses after durationMs. */
  show(message: string, type: Toast['type'] = 'info', durationMs = 3000): void {
    const id = ++this.counter;
    this.toasts.update((t) => [...t, { id, message, type }]);
    setTimeout(() => this.dismiss(id), durationMs);
  }

  /** Shows a success toast. */
  success(message: string): void {
    this.show(message, 'success');
  }

  /** Shows an error toast. */
  error(message: string): void {
    this.show(message, 'error');
  }

  /** Shows an info toast. */
  info(message: string): void {
    this.show(message, 'info');
  }

  /** Dismisses a toast by id. */
  dismiss(id: number): void {
    this.toasts.update((t) => t.filter((x) => x.id !== id));
  }
}
