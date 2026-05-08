import {
  EventEmitter,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-E24KRSQY.js";

// src/app/shared/ui/skeleton-loader/skeleton-loader.component.ts
function SkeletonLoaderComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 9);
  }
  if (rf & 2) {
    const row_r1 = ctx.$implicit;
    \u0275\u0275classMap(row_r1);
  }
}
var SkeletonLoaderComponent = class _SkeletonLoaderComponent {
  constructor() {
    this.rows = ["w-full", "w-full", "w-3/4"];
  }
  static {
    this.\u0275fac = function SkeletonLoaderComponent_Factory(t) {
      return new (t || _SkeletonLoaderComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SkeletonLoaderComponent, selectors: [["app-skeleton-loader"]], inputs: { rows: "rows" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 12, vars: 0, consts: [[1, "bg-white", "rounded-xl", "border", "border-gray-100", "p-5", "animate-pulse"], [1, "flex", "items-center", "gap-2", "mb-4"], [1, "w-7", "h-7", "bg-gray-200", "rounded-full"], [1, "h-3", "bg-gray-200", "rounded", "w-24"], [1, "h-3", "bg-gray-100", "rounded", "w-16", "ml-1"], [1, "space-y-2.5"], [1, "h-4", "bg-gray-200", "rounded", 3, "class"], [1, "flex", "gap-3", "mt-4"], [1, "h-3", "bg-gray-100", "rounded", "w-10"], [1, "h-4", "bg-gray-200", "rounded"]], template: function SkeletonLoaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275element(2, "div", 2)(3, "div", 3)(4, "div", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 5);
        \u0275\u0275repeaterCreate(6, SkeletonLoaderComponent_For_7_Template, 1, 2, "div", 6, \u0275\u0275repeaterTrackByIndex);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 7);
        \u0275\u0275element(9, "div", 8)(10, "div", 8)(11, "div", 8);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275repeater(ctx.rows);
      }
    }, encapsulation: 2, changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SkeletonLoaderComponent, { className: "SkeletonLoaderComponent" });
})();

// src/app/shared/ui/empty-state/empty-state.component.ts
function EmptyStateComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.subtitle);
  }
}
function EmptyStateComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 7);
    \u0275\u0275listener("click", function EmptyStateComponent_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.action.emit());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.actionLabel, " ");
  }
}
var EmptyStateComponent = class _EmptyStateComponent {
  constructor() {
    this.message = "Nothing here yet";
    this.subtitle = null;
    this.actionLabel = null;
    this.action = new EventEmitter();
  }
  static {
    this.\u0275fac = function EmptyStateComponent_Factory(t) {
      return new (t || _EmptyStateComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmptyStateComponent, selectors: [["app-empty-state"]], inputs: { message: "message", subtitle: "subtitle", actionLabel: "actionLabel" }, outputs: { action: "action" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 8, vars: 3, consts: [[1, "flex", "flex-col", "items-center", "justify-center", "py-20", "text-center"], [1, "w-16", "h-16", "rounded-full", "bg-gray-100", "flex", "items-center", "justify-center", "mb-4"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", "stroke-width", "1.5", 1, "w-8", "h-8", "text-gray-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"], [1, "text-base", "font-semibold", "text-gray-600"], [1, "text-sm", "text-gray-400", "mt-1"], ["type", "button", 1, "mt-5", "px-4", "py-2", "bg-action-primary", "text-white", "text-sm", "font-medium", "rounded-lg", "hover:opacity-90", "transition-opacity"], ["type", "button", 1, "mt-5", "px-4", "py-2", "bg-action-primary", "text-white", "text-sm", "font-medium", "rounded-lg", "hover:opacity-90", "transition-opacity", 3, "click"]], template: function EmptyStateComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(2, "svg", 2);
        \u0275\u0275element(3, "path", 3);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(4, "p", 4);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275template(6, EmptyStateComponent_Conditional_6_Template, 2, 1, "p", 5)(7, EmptyStateComponent_Conditional_7_Template, 2, 1, "button", 6);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.message);
        \u0275\u0275advance();
        \u0275\u0275conditional(6, ctx.subtitle ? 6 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(7, ctx.actionLabel ? 7 : -1);
      }
    }, encapsulation: 2, changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmptyStateComponent, { className: "EmptyStateComponent" });
})();

export {
  SkeletonLoaderComponent,
  EmptyStateComponent
};
//# sourceMappingURL=chunk-FOB27XJ3.js.map
