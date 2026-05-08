import {
  signal,
  ɵɵdefineInjectable
} from "./chunk-E24KRSQY.js";

// src/app/core/services/toast.service.ts
var ToastService = class _ToastService {
  constructor() {
    this.counter = 0;
    this.toasts = signal([]);
  }
  /** Shows a toast notification and auto-dismisses after durationMs. */
  show(message, type = "info", durationMs = 3e3) {
    const id = ++this.counter;
    this.toasts.update((t) => [...t, { id, message, type }]);
    setTimeout(() => this.dismiss(id), durationMs);
  }
  /** Shows a success toast. */
  success(message) {
    this.show(message, "success");
  }
  /** Shows an error toast. */
  error(message) {
    this.show(message, "error");
  }
  /** Shows an info toast. */
  info(message) {
    this.show(message, "info");
  }
  /** Dismisses a toast by id. */
  dismiss(id) {
    this.toasts.update((t) => t.filter((x) => x.id !== id));
  }
  static {
    this.\u0275fac = function ToastService_Factory(t) {
      return new (t || _ToastService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ToastService, factory: _ToastService.\u0275fac, providedIn: "root" });
  }
};

export {
  ToastService
};
//# sourceMappingURL=chunk-JAMVVV62.js.map
