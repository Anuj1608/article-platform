import {
  MentionInputComponent
} from "./chunk-MQCKO6T5.js";
import {
  ToastService
} from "./chunk-JAMVVV62.js";
import {
  ArticleService
} from "./chunk-S7R3JG4N.js";
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
  ErrorMessageComponent
} from "./chunk-TUZO6RPE.js";
import {
  Router,
  inject,
  signal,
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
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵviewQuery
} from "./chunk-E24KRSQY.js";

// src/app/features/articles/create-article/create-article.component.ts
var _c0 = ["bodyInput"];
function CreateArticleComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-error-message", 5);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("message", ctx_r1.error())("showRetry", false);
  }
}
function CreateArticleComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1, "Title is required (max 500 characters)");
    \u0275\u0275elementEnd();
  }
}
function CreateArticleComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1, "Body is required");
    \u0275\u0275elementEnd();
  }
}
function CreateArticleComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Publishing\u2026 ");
  }
}
function CreateArticleComponent_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Publish Article ");
  }
}
var CreateArticleComponent = class _CreateArticleComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.articleService = inject(ArticleService);
    this.router = inject(Router);
    this.toastService = inject(ToastService);
    this.isLoading = signal(false);
    this.error = signal(null);
    this.bodyValue = "";
    this.bodyTouched = false;
    this.form = this.fb.group({
      title: ["", [Validators.required, Validators.maxLength(500)]],
      coverImageUrl: ["", Validators.maxLength(500)]
    });
  }
  /** Submits the new article to the API and navigates to its detail page. */
  onSubmit() {
    this.bodyTouched = true;
    if (this.form.invalid || !this.bodyValue.trim())
      return;
    const { title, coverImageUrl } = this.form.getRawValue();
    this.isLoading.set(true);
    this.error.set(null);
    this.articleService.createArticle(title ?? "", this.bodyValue, coverImageUrl ?? void 0).subscribe({
      next: (article) => {
        this.toastService.success("Article published!");
        this.router.navigate(["/articles", article.id]);
      },
      error: () => {
        this.error.set("Failed to publish article. Please try again.");
        this.isLoading.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function CreateArticleComponent_Factory(t) {
      return new (t || _CreateArticleComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateArticleComponent, selectors: [["app-create-article"]], viewQuery: function CreateArticleComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.bodyInput = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 38, vars: 6, consts: [["bodyInput", ""], [1, "max-w-2xl", "mx-auto", "py-10", "px-6"], [1, "mb-8"], [1, "text-3xl", "font-bold", "text-brand"], [1, "text-gray-500", "mt-1"], [1, "mb-4", 3, "message", "showRetry"], [1, "space-y-6", 3, "ngSubmit", "formGroup"], ["for", "title", 1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1.5"], ["id", "title", "formControlName", "title", "type", "text", "placeholder", "Give your article a compelling title", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-4", "py-2.5", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-action-primary", "focus:border-transparent", "transition"], [1, "text-red-600", "text-xs", "mt-1"], ["for", "coverImageUrl", 1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1.5"], [1, "text-gray-400", "font-normal", "ml-1"], ["id", "coverImageUrl", "formControlName", "coverImageUrl", "type", "url", "placeholder", "https://example.com/image.jpg", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-4", "py-2.5", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-action-primary", "focus:border-transparent", "transition"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-1.5"], [1, "text-xs", "text-gray-400", "mb-2"], [1, "bg-gray-100", "px-1", "rounded"], ["placeholder", "Write your article here... Use @ to mention users", 3, "valueChange"], [1, "flex", "gap-3", "justify-end", "pt-2"], ["type", "button", 1, "px-5", "py-2.5", "text-sm", "border", "border-gray-300", "rounded-lg", "hover:bg-gray-50", "transition-colors", "text-gray-700", 3, "click"], ["type", "submit", 1, "px-5", "py-2.5", "bg-action-primary", "text-white", "text-sm", "font-semibold", "rounded-lg", "hover:opacity-90", "disabled:opacity-50", "transition-opacity", 3, "disabled"]], template: function CreateArticleComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h1", 3);
        \u0275\u0275text(3, "New Article");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p", 4);
        \u0275\u0275text(5, "Share your ideas with the community.");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, CreateArticleComponent_Conditional_6_Template, 1, 2, "app-error-message", 5);
        \u0275\u0275elementStart(7, "form", 6);
        \u0275\u0275listener("ngSubmit", function CreateArticleComponent_Template_form_ngSubmit_7_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onSubmit());
        });
        \u0275\u0275elementStart(8, "div")(9, "label", 7);
        \u0275\u0275text(10, "Title");
        \u0275\u0275elementEnd();
        \u0275\u0275element(11, "input", 8);
        \u0275\u0275template(12, CreateArticleComponent_Conditional_12_Template, 2, 0, "p", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div")(14, "label", 10);
        \u0275\u0275text(15, " Cover Image URL ");
        \u0275\u0275elementStart(16, "span", 11);
        \u0275\u0275text(17, "(optional)");
        \u0275\u0275elementEnd()();
        \u0275\u0275element(18, "input", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "div")(20, "label", 13);
        \u0275\u0275text(21, "Body");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "p", 14);
        \u0275\u0275text(23, "Tip: embed images with ");
        \u0275\u0275elementStart(24, "code", 15);
        \u0275\u0275text(25, "![caption](url)");
        \u0275\u0275elementEnd();
        \u0275\u0275text(26, " and bold with ");
        \u0275\u0275elementStart(27, "code", 15);
        \u0275\u0275text(28, "**text**");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "app-mention-input", 16, 0);
        \u0275\u0275listener("valueChange", function CreateArticleComponent_Template_app_mention_input_valueChange_29_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.bodyValue = $event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(31, CreateArticleComponent_Conditional_31_Template, 2, 0, "p", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "div", 17)(33, "button", 18);
        \u0275\u0275listener("click", function CreateArticleComponent_Template_button_click_33_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.router.navigate(["/articles"]));
        });
        \u0275\u0275text(34, " Cancel ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "button", 19);
        \u0275\u0275template(36, CreateArticleComponent_Conditional_36_Template, 1, 0)(37, CreateArticleComponent_Conditional_37_Template, 1, 0);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        let tmp_3_0;
        \u0275\u0275advance(6);
        \u0275\u0275conditional(6, ctx.error() ? 6 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(12, ((tmp_3_0 = ctx.form.get("title")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("title")) == null ? null : tmp_3_0.touched) ? 12 : -1);
        \u0275\u0275advance(19);
        \u0275\u0275conditional(31, ctx.bodyTouched && !ctx.bodyValue.trim() ? 31 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", ctx.isLoading() || ctx.form.invalid || !ctx.bodyValue.trim());
        \u0275\u0275advance();
        \u0275\u0275conditional(36, ctx.isLoading() ? 36 : 37);
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MentionInputComponent, ErrorMessageComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateArticleComponent, { className: "CreateArticleComponent" });
})();
export {
  CreateArticleComponent
};
//# sourceMappingURL=chunk-YB46OE3V.js.map
