import { Injectable, signal } from '@angular/core';

/** Controls the global auth-gate modal shown when unauthenticated users try to interact. */
@Injectable({ providedIn: 'root' })
export class AuthGateService {
  readonly visible = signal(false);

  open(): void {
    this.visible.set(true);
  }

  close(): void {
    this.visible.set(false);
  }
}
