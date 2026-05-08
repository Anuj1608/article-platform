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

// src/app/features/auth/register/register.component.ts
function RegisterComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-error-message", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("message", ctx_r0.error())("showRetry", false);
  }
}
function RegisterComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, " Username is required (max 50 characters) ");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "Valid email is required");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 12);
    \u0275\u0275element(1, "path", 16);
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 12);
    \u0275\u0275element(1, "path", 17)(2, "path", 18);
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, " Password must be at least 8 characters ");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Creating account\u2026 ");
  }
}
function RegisterComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Create Account ");
  }
}
var RegisterComponent = class _RegisterComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.authService = inject(AuthService);
    this.router = inject(Router);
    this.isLoading = signal(false);
    this.error = signal(null);
    this.showPassword = signal(false);
    this.form = this.fb.group({
      username: ["", [Validators.required, Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    });
  }
  onSubmit() {
    if (this.form.invalid)
      return;
    const { username, email, password } = this.form.getRawValue();
    this.isLoading.set(true);
    this.error.set(null);
    this.authService.register(username, email, password).subscribe({
      next: () => this.router.navigate(["/login"]),
      error: (err) => {
        this.error.set(err.error?.error ?? "Registration failed. Please try again.");
        this.isLoading.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function RegisterComponent_Factory(t) {
      return new (t || _RegisterComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 32, vars: 10, consts: [[1, "min-h-screen", "flex", "items-center", "justify-center", "bg-gray-50", "px-4"], [1, "w-full", "max-w-md", "bg-white", "rounded-2xl", "shadow-sm", "border", "border-gray-200", "p-8"], [1, "text-2xl", "font-bold", "text-brand", "mb-6", "text-center"], [1, "mb-4", 3, "message", "showRetry"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1"], ["formControlName", "username", "type", "text", "autocomplete", "username", "placeholder", "johndoe", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-3", "py-2", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-action-primary"], [1, "text-red-600", "text-xs", "mt-1"], ["formControlName", "email", "type", "email", "autocomplete", "email", "placeholder", "you@example.com", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-3", "py-2", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-action-primary"], [1, "relative"], ["formControlName", "password", "autocomplete", "new-password", "placeholder", "Min 8 characters", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-3", "py-2", "pr-10", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-action-primary", 3, "type"], ["type", "button", 1, "absolute", "inset-y-0", "right-0", "flex", "items-center", "pr-3", "text-gray-400", "hover:text-gray-600", 3, "click"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "w-4", "h-4"], ["type", "submit", 1, "w-full", "py-2", "bg-action-primary", "text-white", "text-sm", "font-medium", "rounded-lg", "hover:opacity-90", "disabled:opacity-50", "transition-opacity", 3, "disabled"], [1, "text-center", "text-sm", "text-gray-500", "mt-6"], ["routerLink", "/login", 1, "text-action-primary", "hover:underline", "font-medium"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"]], template: function RegisterComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
        \u0275\u0275text(3, " Create Account ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, RegisterComponent_Conditional_4_Template, 1, 2, "app-error-message", 3);
        \u0275\u0275elementStart(5, "form", 4);
        \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_5_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(6, "div")(7, "label", 5);
        \u0275\u0275text(8, "Username");
        \u0275\u0275elementEnd();
        \u0275\u0275element(9, "input", 6);
        \u0275\u0275template(10, RegisterComponent_Conditional_10_Template, 2, 0, "p", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div")(12, "label", 5);
        \u0275\u0275text(13, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(14, "input", 8);
        \u0275\u0275template(15, RegisterComponent_Conditional_15_Template, 2, 0, "p", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div")(17, "label", 5);
        \u0275\u0275text(18, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "div", 9);
        \u0275\u0275element(20, "input", 10);
        \u0275\u0275elementStart(21, "button", 11);
        \u0275\u0275listener("click", function RegisterComponent_Template_button_click_21_listener() {
          return ctx.showPassword.set(!ctx.showPassword());
        });
        \u0275\u0275template(22, RegisterComponent_Conditional_22_Template, 2, 0, ":svg:svg", 12)(23, RegisterComponent_Conditional_23_Template, 3, 0);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(24, RegisterComponent_Conditional_24_Template, 2, 0, "p", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "button", 13);
        \u0275\u0275template(26, RegisterComponent_Conditional_26_Template, 1, 0)(27, RegisterComponent_Conditional_27_Template, 1, 0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "p", 14);
        \u0275\u0275text(29, " Already have an account? ");
        \u0275\u0275elementStart(30, "a", 15);
        \u0275\u0275text(31, " Sign In ");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        let tmp_2_0;
        let tmp_3_0;
        let tmp_7_0;
        \u0275\u0275advance(4);
        \u0275\u0275conditional(4, ctx.error() ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(10, ((tmp_2_0 = ctx.form.get("username")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.form.get("username")) == null ? null : tmp_2_0.touched) ? 10 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(15, ((tmp_3_0 = ctx.form.get("email")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("email")) == null ? null : tmp_3_0.touched) ? 15 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275property("type", ctx.showPassword() ? "text" : "password");
        \u0275\u0275advance();
        \u0275\u0275attribute("aria-label", ctx.showPassword() ? "Hide password" : "Show password");
        \u0275\u0275advance();
        \u0275\u0275conditional(22, ctx.showPassword() ? 22 : 23);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(24, ((tmp_7_0 = ctx.form.get("password")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx.form.get("password")) == null ? null : tmp_7_0.touched) ? 24 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.isLoading() || ctx.form.invalid);
        \u0275\u0275advance();
        \u0275\u0275conditional(26, ctx.isLoading() ? 26 : 27);
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink, ErrorMessageComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent" });
})();
export {
  RegisterComponent
};
//# sourceMappingURL=chunk-XBZV62TU.js.map
