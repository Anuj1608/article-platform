import {
  EventEmitter,
  HttpClient,
  HttpParams,
  Subject,
  debounceTime,
  distinctUntilChanged,
  environment,
  inject,
  map,
  signal,
  switchMap,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-E24KRSQY.js";

// src/app/features/auth/services/user-search.service.ts
var UserSearchService = class _UserSearchService {
  constructor(http) {
    this.http = http;
  }
  /**
   * Searches users by username fragment (case-insensitive).
   */
  searchUsers(query) {
    const params = new HttpParams().set("q", query);
    return this.http.get(`${environment.apiUrl}/users/search`, { params }).pipe(map((r) => r.data));
  }
  static {
    this.\u0275fac = function UserSearchService_Factory(t) {
      return new (t || _UserSearchService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserSearchService, factory: _UserSearchService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/comments/mention-input/mention-input.component.ts
var _c0 = ["textarea"];
var _forTrack0 = ($index, $item) => $item.id;
function MentionInputComponent_Conditional_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 5);
    \u0275\u0275listener("click", function MentionInputComponent_Conditional_3_For_2_Template_button_click_0_listener() {
      const user_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.selectUser(user_r3));
    });
    \u0275\u0275elementStart(1, "span", 6);
    \u0275\u0275text(2, "@");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 7);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const user_r3 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(user_r3.username);
  }
}
function MentionInputComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275repeaterCreate(1, MentionInputComponent_Conditional_3_For_2_Template, 5, 1, "button", 4, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.suggestions());
  }
}
var MentionInputComponent = class _MentionInputComponent {
  constructor() {
    this.userSearchService = inject(UserSearchService);
    this.destroy$ = new Subject();
    this.searchTrigger$ = new Subject();
    this.placeholder = "Write something... Use @ to mention users";
    this.valueChange = new EventEmitter();
    this.value = signal("");
    this.suggestions = signal([]);
    this.currentMentionStart = -1;
    this.searchTrigger$.pipe(debounceTime(300), distinctUntilChanged(), switchMap((query) => this.userSearchService.searchUsers(query)), takeUntil(this.destroy$)).subscribe({
      next: (users) => this.suggestions.set(users),
      error: () => this.suggestions.set([])
    });
  }
  /** Detects @mention trigger and fires user search. Updates value signal. */
  onInput(event) {
    const target = event.target;
    const text = target.value;
    this.value.set(text);
    this.valueChange.emit(text);
    const cursorPos = target.selectionStart ?? text.length;
    const textBeforeCursor = text.substring(0, cursorPos);
    const mentionMatch = /@(\w*)$/.exec(textBeforeCursor);
    if (mentionMatch) {
      this.currentMentionStart = mentionMatch.index;
      this.searchTrigger$.next(mentionMatch[1]);
    } else {
      this.currentMentionStart = -1;
      this.suggestions.set([]);
    }
  }
  /** Replaces the partial @mention in the textarea with the selected username. */
  selectUser(user) {
    const currentValue = this.value();
    const before = currentValue.substring(0, this.currentMentionStart);
    const afterCursor = currentValue.substring(this.currentMentionStart);
    const afterMention = afterCursor.replace(/^@\w*/, "");
    const newValue = `${before}@${user.username} ${afterMention}`;
    this.value.set(newValue);
    this.valueChange.emit(newValue);
    this.suggestions.set([]);
    this.currentMentionStart = -1;
  }
  /** Returns the current text value. */
  getValue() {
    return this.value();
  }
  /** Resets the textarea to empty. */
  reset() {
    this.value.set("");
    this.suggestions.set([]);
    this.currentMentionStart = -1;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.\u0275fac = function MentionInputComponent_Factory(t) {
      return new (t || _MentionInputComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MentionInputComponent, selectors: [["app-mention-input"]], viewQuery: function MentionInputComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.textareaRef = _t.first);
      }
    }, inputs: { placeholder: "placeholder" }, outputs: { valueChange: "valueChange" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 4, vars: 3, consts: [["textarea", ""], [1, "relative"], ["rows", "3", 1, "w-full", "rounded-lg", "border", "border-gray-300", "px-3", "py-2", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-action-primary", "resize-none", 3, "input", "value", "placeholder"], [1, "absolute", "z-10", "bottom-full", "mb-1", "w-full", "bg-white", "border", "border-gray-200", "rounded-lg", "shadow-lg", "overflow-hidden"], ["type", "button", 1, "w-full", "text-left", "px-3", "py-2", "text-sm", "hover:bg-gray-50", "flex", "items-center", "gap-2"], ["type", "button", 1, "w-full", "text-left", "px-3", "py-2", "text-sm", "hover:bg-gray-50", "flex", "items-center", "gap-2", 3, "click"], [1, "text-gray-400"], [1, "font-medium", "text-gray-900"]], template: function MentionInputComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "textarea", 2, 0);
        \u0275\u0275listener("input", function MentionInputComponent_Template_textarea_input_1_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onInput($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, MentionInputComponent_Conditional_3_Template, 3, 0, "div", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("value", ctx.value())("placeholder", ctx.placeholder);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(3, ctx.suggestions().length > 0 ? 3 : -1);
      }
    }, encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MentionInputComponent, { className: "MentionInputComponent" });
})();

export {
  MentionInputComponent
};
//# sourceMappingURL=chunk-MQCKO6T5.js.map
