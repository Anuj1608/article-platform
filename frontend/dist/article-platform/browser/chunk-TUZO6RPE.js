import {
  EventEmitter,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-E24KRSQY.js";

// src/app/shared/ui/error-message/error-message.component.ts
function ErrorMessageComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function ErrorMessageComponent_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retry.emit());
    });
    \u0275\u0275text(1, " Retry ");
    \u0275\u0275elementEnd();
  }
}
var ErrorMessageComponent = class _ErrorMessageComponent {
  constructor() {
    this.message = "Something went wrong";
    this.showRetry = true;
    this.retry = new EventEmitter();
  }
  static {
    this.\u0275fac = function ErrorMessageComponent_Factory(t) {
      return new (t || _ErrorMessageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ErrorMessageComponent, selectors: [["app-error-message"]], inputs: { message: "message", showRetry: "showRetry" }, outputs: { retry: "retry" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 7, vars: 2, consts: [[1, "bg-red-50", "border", "border-red-200", "rounded-lg", "p-4", "flex", "items-center", "justify-between"], [1, "flex", "items-center", "gap-3"], ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "w-5", "h-5", "text-red-600", "flex-shrink-0"], ["fill-rule", "evenodd", "d", "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", "clip-rule", "evenodd"], [1, "text-red-800", "text-sm"], ["type", "button", 1, "text-sm", "font-medium", "text-red-700", "hover:text-red-900", "underline"], ["type", "button", 1, "text-sm", "font-medium", "text-red-700", "hover:text-red-900", "underline", 3, "click"]], template: function ErrorMessageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(2, "svg", 2);
        \u0275\u0275element(3, "path", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(4, "span", 4);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, ErrorMessageComponent_Conditional_6_Template, 2, 0, "button", 5);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.message);
        \u0275\u0275advance();
        \u0275\u0275conditional(6, ctx.showRetry ? 6 : -1);
      }
    }, encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ErrorMessageComponent, { className: "ErrorMessageComponent" });
})();

export {
  ErrorMessageComponent
};
//# sourceMappingURL=chunk-TUZO6RPE.js.map
