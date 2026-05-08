import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-XXDRLCCH.js";
import {
  AuthService
} from "./chunk-CGBIIZPU.js";
import {
  ErrorMessageComponent
} from "./chunk-TUZO6RPE.js";
import {
  Router,
  RouterLink,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext
} from "./chunk-E24KRSQY.js";

// src/app/features/auth/login/login.component.ts
function LoginComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-error-message", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("message", ctx_r0.error())("showRetry", false);
  }
}
function LoginComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "Valid email is required");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 11);
    \u0275\u0275element(1, "path", 15);
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 11);
    \u0275\u0275element(1, "path", 16)(2, "path", 17);
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "Password is required");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Signing in\u2026 ");
  }
}
function LoginComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Sign In ");
  }
}
var LoginComponent = class _LoginComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.authService = inject(AuthService);
    this.router = inject(Router);
    this.isLoading = signal(false);
    this.error = signal(null);
    this.showPassword = signal(false);
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }
  onSubmit() {
    if (this.form.invalid)
      return;
    const { email, password } = this.form.getRawValue();
    this.isLoading.set(true);
    this.error.set(null);
    this.authService.login(email, password).subscribe({
      next: () => this.router.navigate(["/articles"]),
      error: (err) => {
        this.error.set(err.error?.error ?? "Invalid email or password.");
        this.isLoading.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(t) {
      return new (t || _LoginComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 27, vars: 9, consts: [[1, "min-h-screen", "flex", "items-center", "justify-center", "bg-gray-50", "px-4"], [1, "w-full", "max-w-md", "bg-white", "rounded-2xl", "shadow-sm", "border", "border-gray-200", "p-8"], [1, "text-2xl", "font-bold", "text-brand", "mb-6", "text-center"], [1, "mb-4", 3, "message", "showRetry"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["formControlName", "email", "type", "email", "autocomplete", "email", "placeholder", "you@example.com", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-3", "py-2", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-action-primary"], [1, "text-red-600", "text-xs", "mt-1"], [1, "relative"], ["formControlName", "password", "autocomplete", "current-password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-3", "py-2", "pr-10", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-action-primary", 3, "type"], ["type", "button", 1, "absolute", "inset-y-0", "right-0", "flex", "items-center", "pr-3", "text-gray-400", "hover:text-gray-600", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "w-4", "h-4"], ["type", "submit", 1, "w-full", "py-2", "bg-action-primary", "text-white", "text-sm", "font-medium", "rounded-lg", "hover:opacity-90", "disabled:opacity-50", "transition-opacity", 3, "disabled"], [1, "text-center", "text-sm", "text-gray-500", "mt-6"], ["routerLink", "/register", 1, "text-action-primary", "hover:underline", "font-medium"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, "Sign In");
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, LoginComponent_Conditional_4_Template, 1, 2, "app-error-message", 3);
        \u0275\u0275elementStart(5, "form", 4);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_5_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(6, "div")(7, "label", 5);
        \u0275\u0275text(8, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(9, "input", 6);
        \u0275\u0275template(10, LoginComponent_Conditional_10_Template, 2, 0, "p", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div")(12, "label", 5);
        \u0275\u0275text(13, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "div", 8);
        \u0275\u0275element(15, "input", 9);
        \u0275\u0275elementStart(16, "button", 10);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_16_listener() {
          return ctx.showPassword.set(!ctx.showPassword());
        });
        \u0275\u0275template(17, LoginComponent_Conditional_17_Template, 2, 0, ":svg:svg", 11)(18, LoginComponent_Conditional_18_Template, 3, 0);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(19, LoginComponent_Conditional_19_Template, 2, 0, "p", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "button", 12);
        \u0275\u0275template(21, LoginComponent_Conditional_21_Template, 1, 0)(22, LoginComponent_Conditional_22_Template, 1, 0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "p", 13);
        \u0275\u0275text(24, " Don't have an account? ");
        \u0275\u0275elementStart(25, "a", 14);
        \u0275\u0275text(26, " Register ");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        let tmp_2_0;
        let tmp_6_0;
        \u0275\u0275advance(4);
        \u0275\u0275conditional(4, ctx.error() ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(10, ((tmp_2_0 = ctx.form.get("email")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.form.get("email")) == null ? null : tmp_2_0.touched) ? 10 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275property("type", ctx.showPassword() ? "text" : "password");
        \u0275\u0275advance();
        \u0275\u0275attribute("aria-label", ctx.showPassword() ? "Hide password" : "Show password");
        \u0275\u0275advance();
        \u0275\u0275conditional(17, ctx.showPassword() ? 17 : 18);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(19, ((tmp_6_0 = ctx.form.get("password")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx.form.get("password")) == null ? null : tmp_6_0.touched) ? 19 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.isLoading() || ctx.form.invalid);
        \u0275\u0275advance();
        \u0275\u0275conditional(21, ctx.isLoading() ? 21 : 22);
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink, ErrorMessageComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent" });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-F63UVBXA.js.map
