import {
  signal,
  ɵɵdefineInjectable
} from "./chunk-E24KRSQY.js";

// src/app/core/services/auth-gate.service.ts
var AuthGateService = class _AuthGateService {
  constructor() {
    this.visible = signal(false);
  }
  open() {
    this.visible.set(true);
  }
  close() {
    this.visible.set(false);
  }
  static {
    this.\u0275fac = function AuthGateService_Factory(t) {
      return new (t || _AuthGateService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthGateService, factory: _AuthGateService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthGateService
};
//# sourceMappingURL=chunk-RTZVG6EY.js.map
