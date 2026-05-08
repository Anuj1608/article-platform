import {
  AuthGateService
} from "./chunk-RTZVG6EY.js";
import {
  EmptyStateComponent,
  SkeletonLoaderComponent
} from "./chunk-FOB27XJ3.js";
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
  AuthService
} from "./chunk-CGBIIZPU.js";
import {
  ErrorMessageComponent
} from "./chunk-TUZO6RPE.js";
import {
  ActivatedRoute,
  DomSanitizer,
  EventEmitter,
  HttpClient,
  __spreadProps,
  __spreadValues,
  computed,
  environment,
  inject,
  map,
  signal,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-E24KRSQY.js";

// src/app/shared/pipes/article-body.pipe.ts
var ArticleBodyPipe = class _ArticleBodyPipe {
  constructor(sanitizer) {
    this.sanitizer = sanitizer;
  }
  transform(body) {
    if (!body)
      return "";
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let html = "";
    let lastIndex = 0;
    let match;
    while ((match = imageRegex.exec(body)) !== null) {
      html += this.textToHtml(body.slice(lastIndex, match.index));
      const alt = this.escapeHtml(match[1]);
      const url = this.escapeAttr(match[2]);
      html += `<figure class="my-8"><img src="${url}" alt="${alt}" class="rounded-xl w-full object-cover shadow-md max-h-[480px]" loading="lazy" onerror="this.parentElement.style.display='none'"/><figcaption class="text-center text-sm text-gray-400 mt-2 italic">${alt}</figcaption></figure>`;
      lastIndex = match.index + match[0].length;
    }
    html += this.textToHtml(body.slice(lastIndex));
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  textToHtml(text) {
    if (!text.trim())
      return "";
    return text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean).map((p) => {
      const escaped = this.escapeHtml(p).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
      return `<p class="mb-5">${escaped}</p>`;
    }).join("");
  }
  escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  escapeAttr(s) {
    return s.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  static {
    this.\u0275fac = function ArticleBodyPipe_Factory(t) {
      return new (t || _ArticleBodyPipe)(\u0275\u0275directiveInject(DomSanitizer, 16));
    };
  }
  static {
    this.\u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "articleBody", type: _ArticleBodyPipe, pure: true, standalone: true });
  }
};

// src/app/features/comments/services/comment.service.ts
var CommentService = class _CommentService {
  constructor(http) {
    this.http = http;
  }
  /** Returns the threaded comment tree for an article. */
  getComments(articleId) {
    return this.http.get(`${environment.apiUrl}/articles/${articleId}/comments`).pipe(map((r) => r.data));
  }
  /** Adds a root comment to an article. */
  addComment(articleId, body) {
    return this.http.post(`${environment.apiUrl}/articles/${articleId}/comments`, { body }).pipe(map((r) => r.data));
  }
  /** Adds a reply to an existing comment. */
  addReply(parentCommentId, body) {
    return this.http.post(`${environment.apiUrl}/comments/${parentCommentId}/replies`, { body }).pipe(map((r) => r.data));
  }
  /** Reacts to a comment with like or dislike. Toggling the same reaction removes it. */
  react(commentId, type) {
    return this.http.post(`${environment.apiUrl}/comments/${commentId}/${type}`, {}).pipe(map((r) => r.data));
  }
  static {
    this.\u0275fac = function CommentService_Factory(t) {
      return new (t || _CommentService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CommentService, factory: _CommentService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/comments/comment-form/comment-form.component.ts
var _c0 = ["mentionInput"];
var CommentFormComponent = class _CommentFormComponent {
  constructor() {
    this.placeholder = "Write a comment...";
    this.submitted = new EventEmitter();
    this.currentBody = "";
  }
  /** Emits the body text and resets the form. */
  onSubmit(event) {
    event.preventDefault();
    const body = this.currentBody.trim();
    if (!body)
      return;
    this.submitted.emit(body);
    this.currentBody = "";
    this.mentionInput.reset();
  }
  static {
    this.\u0275fac = function CommentFormComponent_Factory(t) {
      return new (t || _CommentFormComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CommentFormComponent, selectors: [["app-comment-form"]], viewQuery: function CommentFormComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.mentionInput = _t.first);
      }
    }, inputs: { placeholder: "placeholder" }, outputs: { submitted: "submitted" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 2, consts: [["mentionInput", ""], [1, "space-y-2", 3, "submit"], [3, "valueChange", "placeholder"], [1, "flex", "justify-end"], ["type", "submit", 1, "px-4", "py-1.5", "bg-action-primary", "text-white", "text-sm", "font-medium", "rounded-lg", "hover:opacity-90", "disabled:opacity-40", "transition-opacity", 3, "disabled"]], template: function CommentFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "form", 1);
        \u0275\u0275listener("submit", function CommentFormComponent_Template_form_submit_0_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onSubmit($event));
        });
        \u0275\u0275elementStart(1, "app-mention-input", 2, 0);
        \u0275\u0275listener("valueChange", function CommentFormComponent_Template_app_mention_input_valueChange_1_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.currentBody = $event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 3)(4, "button", 4);
        \u0275\u0275text(5, " Post ");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("placeholder", ctx.placeholder);
        \u0275\u0275advance(3);
        \u0275\u0275property("disabled", !ctx.currentBody.trim());
      }
    }, dependencies: [MentionInputComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CommentFormComponent, { className: "CommentFormComponent" });
})();

// src/app/features/comments/comment-item/comment-item.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function CommentItemComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "app-comment-form", 15);
    \u0275\u0275listener("submitted", function CommentItemComponent_Conditional_22_Template_app_comment_form_submitted_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onReply($event));
    });
    \u0275\u0275elementEnd()();
  }
}
function CommentItemComponent_Conditional_23_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-comment-item", 17);
    \u0275\u0275listener("replySubmitted", function CommentItemComponent_Conditional_23_For_2_Template_app_comment_item_replySubmitted_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.replySubmitted.emit($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const reply_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("comment", reply_r4)("isAuthenticated", ctx_r1.isAuthenticated);
  }
}
function CommentItemComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275repeaterCreate(1, CommentItemComponent_Conditional_23_For_2_Template, 1, 2, "app-comment-item", 16, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.localComment().replies);
  }
}
var CommentItemComponent = class _CommentItemComponent {
  constructor() {
    this.isAuthenticated = false;
    this.replySubmitted = new EventEmitter();
    this.localComment = signal(null);
    this.showReplyForm = signal(false);
    this.commentService = inject(CommentService);
    this.authGate = inject(AuthGateService);
  }
  ngOnChanges() {
    this.localComment.set(this.comment);
  }
  get authorInitials() {
    return this.localComment()?.author.username.charAt(0).toUpperCase() ?? "";
  }
  toggleReply() {
    if (!this.isAuthenticated) {
      this.authGate.open();
      return;
    }
    this.showReplyForm.update((v) => !v);
  }
  onReply(body) {
    const c = this.localComment();
    if (c) {
      this.replySubmitted.emit({ parentId: c.id, body });
    }
    this.showReplyForm.set(false);
  }
  onReact(type) {
    const c = this.localComment();
    if (!c)
      return;
    if (!this.isAuthenticated) {
      this.authGate.open();
      return;
    }
    const rType = type.toUpperCase();
    const wasActive = c.userReaction === rType;
    let lk = c.likeCount;
    let dk = c.dislikeCount;
    const nr = wasActive ? null : rType;
    if (wasActive) {
      if (type === "like")
        lk--;
      else
        dk--;
    } else {
      if (type === "like") {
        lk++;
        if (c.userReaction === "DISLIKE")
          dk--;
      } else {
        dk++;
        if (c.userReaction === "LIKE")
          lk--;
      }
    }
    this.localComment.set(__spreadProps(__spreadValues({}, c), { likeCount: lk, dislikeCount: dk, userReaction: nr }));
    this.commentService.react(c.id, type).subscribe({
      next: (r) => this.localComment.update((x) => x ? __spreadValues(__spreadValues({}, x), r) : x),
      error: () => this.localComment.set(c)
    });
  }
  timeAgo(dateStr) {
    if (!dateStr)
      return "";
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 6e4);
    if (minutes < 1)
      return "just now";
    if (minutes < 60)
      return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24)
      return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30)
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    const months = Math.floor(days / 30);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  }
  static {
    this.\u0275fac = function CommentItemComponent_Factory(t) {
      return new (t || _CommentItemComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CommentItemComponent, selectors: [["app-comment-item"]], inputs: { comment: "comment", isAuthenticated: "isAuthenticated" }, outputs: { replySubmitted: "replySubmitted" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 24, vars: 13, consts: [[1, "flex", "flex-col", "gap-1"], [1, "bg-white", "rounded-xl", "border", "border-gray-100", "p-4", "shadow-sm"], [1, "flex", "items-center", "gap-2", "mb-2"], [1, "w-7", "h-7", "rounded-full", "bg-gray-200", "text-gray-600", "flex", "items-center", "justify-center", "text-xs", "font-bold", "shrink-0"], [1, "text-sm", "font-semibold", "text-gray-800"], [1, "text-xs", "text-gray-400"], [1, "text-sm", "text-gray-700", "leading-relaxed", "whitespace-pre-wrap", "mb-3"], [1, "flex", "items-center", "gap-3", "text-xs"], ["type", "button", 1, "flex", "items-center", "gap-1.5", "transition-colors", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", "stroke-width", "2", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"], ["type", "button", 1, "ml-2", "text-gray-400", "hover:text-action-primary", "transition-colors", 3, "click"], [1, "ml-8", "mt-1"], [1, "ml-8", "border-l-2", "border-gray-100", "pl-4", "flex", "flex-col", "gap-3", "mt-2"], ["placeholder", "Write a reply...", 3, "submitted"], [3, "comment", "isAuthenticated"], [3, "replySubmitted", "comment", "isAuthenticated"]], template: function CommentItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "span", 4);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "span", 5);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "p", 6);
        \u0275\u0275text(10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div", 7)(12, "button", 8);
        \u0275\u0275listener("click", function CommentItemComponent_Template_button_click_12_listener() {
          return ctx.onReact("like");
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(13, "svg", 9);
        \u0275\u0275element(14, "path", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275text(15);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(16, "button", 8);
        \u0275\u0275listener("click", function CommentItemComponent_Template_button_click_16_listener() {
          return ctx.onReact("dislike");
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(17, "svg", 9);
        \u0275\u0275element(18, "path", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275text(19);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(20, "button", 12);
        \u0275\u0275listener("click", function CommentItemComponent_Template_button_click_20_listener() {
          return ctx.toggleReply();
        });
        \u0275\u0275text(21);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(22, CommentItemComponent_Conditional_22_Template, 2, 0, "div", 13)(23, CommentItemComponent_Conditional_23_Template, 3, 0, "div", 14);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_1_0;
        let tmp_2_0;
        let tmp_3_0;
        let tmp_4_0;
        let tmp_5_0;
        let tmp_6_0;
        let tmp_7_0;
        let tmp_10_0;
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.authorInitials, " ");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", (tmp_1_0 = ctx.localComment()) == null ? null : tmp_1_0.author == null ? null : tmp_1_0.author.username, " ");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.timeAgo((tmp_2_0 = (tmp_2_0 = ctx.localComment()) == null ? null : tmp_2_0.createdAt) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : ""));
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", (tmp_3_0 = ctx.localComment()) == null ? null : tmp_3_0.body, " ");
        \u0275\u0275advance(2);
        \u0275\u0275classMap(((tmp_4_0 = ctx.localComment()) == null ? null : tmp_4_0.userReaction) === "LIKE" ? "text-action-primary font-semibold" : "text-gray-400 hover:text-action-primary");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", (tmp_5_0 = ctx.localComment()) == null ? null : tmp_5_0.likeCount, " ");
        \u0275\u0275advance();
        \u0275\u0275classMap(((tmp_6_0 = ctx.localComment()) == null ? null : tmp_6_0.userReaction) === "DISLIKE" ? "text-red-500 font-semibold" : "text-gray-400 hover:text-red-400");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", (tmp_7_0 = ctx.localComment()) == null ? null : tmp_7_0.dislikeCount, " ");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", ctx.showReplyForm() ? "Cancel" : "Reply", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(22, ctx.showReplyForm() ? 22 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(23, ((tmp_10_0 = (tmp_10_0 = ctx.localComment()) == null ? null : tmp_10_0.replies == null ? null : tmp_10_0.replies.length) !== null && tmp_10_0 !== void 0 ? tmp_10_0 : 0) > 0 ? 23 : -1);
      }
    }, dependencies: [_CommentItemComponent, CommentFormComponent], encapsulation: 2, changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CommentItemComponent, { className: "CommentItemComponent" });
})();

// src/app/features/comments/comment-thread/comment-thread.component.ts
var _forTrack02 = ($index, $item) => $item.id;
var _c02 = () => ["w-1/3", "w-full", "w-3/4"];
var _c1 = () => ["w-1/4", "w-full", "w-2/3"];
function CommentThreadComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(", ctx_r0.comments().length, ")");
  }
}
function CommentThreadComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "app-skeleton-loader", 5)(2, "app-skeleton-loader", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("rows", \u0275\u0275pureFunction0(2, _c02));
    \u0275\u0275advance();
    \u0275\u0275property("rows", \u0275\u0275pureFunction0(3, _c1));
  }
}
function CommentThreadComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-error-message", 6);
    \u0275\u0275listener("retry", function CommentThreadComponent_Conditional_5_Template_app_error_message_retry_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.loadComments());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("message", ctx_r0.error());
  }
}
function CommentThreadComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-empty-state", 7);
  }
}
function CommentThreadComponent_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-comment-item", 10);
    \u0275\u0275listener("replySubmitted", function CommentThreadComponent_Conditional_7_For_2_Template_app_comment_item_replySubmitted_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onReplySubmitted($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const comment_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("comment", comment_r4)("isAuthenticated", ctx_r0.authService.isAuthenticated());
  }
}
function CommentThreadComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275repeaterCreate(1, CommentThreadComponent_Conditional_7_For_2_Template, 1, 2, "app-comment-item", 9, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.comments());
  }
}
function CommentThreadComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h3", 11);
    \u0275\u0275text(1, "Leave a comment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "app-comment-form", 12);
    \u0275\u0275listener("submitted", function CommentThreadComponent_Conditional_9_Template_app_comment_form_submitted_2_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCommentSubmitted($event));
    });
    \u0275\u0275elementEnd();
  }
}
function CommentThreadComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function CommentThreadComponent_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openAuthGate());
    });
    \u0275\u0275text(1, " Sign in to leave a comment... ");
    \u0275\u0275elementEnd();
  }
}
var CommentThreadComponent = class _CommentThreadComponent {
  constructor() {
    this.authService = inject(AuthService);
    this.authGate = inject(AuthGateService);
    this.commentService = inject(CommentService);
    this.comments = signal([]);
    this.isLoading = signal(false);
    this.error = signal(null);
  }
  ngOnInit() {
    this.loadComments();
  }
  openAuthGate() {
    this.authGate.open();
  }
  /** Loads the comment thread from the API. */
  loadComments() {
    this.isLoading.set(true);
    this.error.set(null);
    this.commentService.getComments(this.articleId).subscribe({
      next: (data) => {
        this.comments.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set("Failed to load comments");
        this.isLoading.set(false);
      }
    });
  }
  /** Handles root comment submission. New comments initialize with zero reactions. */
  onCommentSubmitted(body) {
    this.commentService.addComment(this.articleId, body).subscribe({
      next: (comment) => {
        const withReactions = __spreadProps(__spreadValues({}, comment), {
          likeCount: comment.likeCount ?? 0,
          dislikeCount: comment.dislikeCount ?? 0,
          userReaction: comment.userReaction ?? null,
          replies: comment.replies ?? []
        });
        this.comments.update((list) => [withReactions, ...list]);
      }
    });
  }
  /** Handles reply submission from a CommentItemComponent. */
  onReplySubmitted(event) {
    this.commentService.addReply(event.parentId, event.body).subscribe({
      next: (reply) => {
        const withReactions = __spreadProps(__spreadValues({}, reply), {
          likeCount: reply.likeCount ?? 0,
          dislikeCount: reply.dislikeCount ?? 0,
          userReaction: reply.userReaction ?? null,
          replies: reply.replies ?? []
        });
        this.comments.update((list) => list.map((c) => c.id === event.parentId ? __spreadProps(__spreadValues({}, c), { replies: [...c.replies, withReactions] }) : c));
      }
    });
  }
  static {
    this.\u0275fac = function CommentThreadComponent_Factory(t) {
      return new (t || _CommentThreadComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CommentThreadComponent, selectors: [["app-comment-thread"]], inputs: { articleId: "articleId" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 11, vars: 3, consts: [[1, "mt-10"], [1, "text-xl", "font-bold", "text-brand", "mb-5"], [1, "text-sm", "font-normal", "text-gray-400", "ml-2"], [1, "space-y-4"], [1, "mt-8", "pt-6", "border-t", "border-gray-200"], [3, "rows"], [3, "retry", "message"], ["message", "No comments yet", "subtitle", "Be the first to start the conversation!"], [1, "flex", "flex-col", "gap-4"], [3, "comment", "isAuthenticated"], [3, "replySubmitted", "comment", "isAuthenticated"], [1, "text-sm", "font-semibold", "text-gray-700", "mb-3"], [3, "submitted"], ["type", "button", 1, "w-full", "text-left", "px-4", "py-3", "rounded-xl", "border", "border-gray-200", "text-gray-400", "text-sm", "hover:border-gray-400", "hover:text-gray-600", "transition-colors", "bg-gray-50", 3, "click"]], template: function CommentThreadComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0)(1, "h2", 1);
        \u0275\u0275text(2, " Comments ");
        \u0275\u0275template(3, CommentThreadComponent_Conditional_3_Template, 2, 1, "span", 2);
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, CommentThreadComponent_Conditional_4_Template, 3, 4, "div", 3)(5, CommentThreadComponent_Conditional_5_Template, 1, 1)(6, CommentThreadComponent_Conditional_6_Template, 1, 0)(7, CommentThreadComponent_Conditional_7_Template, 3, 0);
        \u0275\u0275elementStart(8, "div", 4);
        \u0275\u0275template(9, CommentThreadComponent_Conditional_9_Template, 3, 0)(10, CommentThreadComponent_Conditional_10_Template, 2, 0);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275conditional(3, ctx.comments().length > 0 ? 3 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(4, ctx.isLoading() ? 4 : ctx.error() ? 5 : ctx.comments().length === 0 ? 6 : 7);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(9, ctx.authService.isAuthenticated() ? 9 : 10);
      }
    }, dependencies: [
      CommentItemComponent,
      CommentFormComponent,
      SkeletonLoaderComponent,
      ErrorMessageComponent,
      EmptyStateComponent
    ], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CommentThreadComponent, { className: "CommentThreadComponent" });
})();

// src/app/features/articles/article-detail/article-detail.component.ts
var _c03 = () => ["w-2/3", "w-1/3", "w-full", "w-full", "w-3/4", "w-full", "w-5/6"];
function ArticleDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-skeleton-loader", 1);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", \u0275\u0275pureFunction0(1, _c03));
  }
}
function ArticleDetailComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-error-message", 2);
    \u0275\u0275listener("retry", function ArticleDetailComponent_Conditional_2_Template_app_error_message_retry_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadArticle());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("message", ctx_r1.error());
  }
}
function ArticleDetailComponent_Conditional_3_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "img", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.article().coverImageUrl, \u0275\u0275sanitizeUrl)("alt", ctx_r1.article().title);
  }
}
function ArticleDetailComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "article")(1, "h1", 3);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 4)(4, "div", 5);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 6)(7, "div", 7)(8, "span", 8);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 9);
    \u0275\u0275text(11, " Follow ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "p", 10);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(14, ArticleDetailComponent_Conditional_3_Conditional_14_Template, 2, 2, "div", 11);
    \u0275\u0275element(15, "div", 12);
    \u0275\u0275pipe(16, "articleBody");
    \u0275\u0275elementStart(17, "div", 13)(18, "button", 14);
    \u0275\u0275listener("click", function ArticleDetailComponent_Conditional_3_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onReact("like"));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(19, "svg", 15);
    \u0275\u0275element(20, "path", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "button", 14);
    \u0275\u0275listener("click", function ArticleDetailComponent_Conditional_3_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onReact("dislike"));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(24, "svg", 15);
    \u0275\u0275element(25, "path", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(26, "span");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "span", 18);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(29, "svg", 15);
    \u0275\u0275element(30, "path", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(32, "app-comment-thread", 20);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.article().title, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.authorInitials(), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.article().author.username);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r1.formatDate(ctx_r1.article().createdAt), " \xB7 ", ctx_r1.readTime(), " min read ");
    \u0275\u0275advance();
    \u0275\u0275conditional(14, ctx_r1.article().coverImageUrl ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", \u0275\u0275pipeBind1(16, 15, ctx_r1.article().body), \u0275\u0275sanitizeHtml);
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.article().userReaction === "LIKE" ? "border-action-primary bg-action-primary text-white" : "border-gray-200 text-gray-500 hover:border-action-primary hover:text-action-primary");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.article().likeCount);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.article().userReaction === "DISLIKE" ? "border-red-500 bg-red-500 text-white" : "border-gray-200 text-gray-500 hover:border-red-400 hover:text-red-500");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.article().dislikeCount);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.article().commentCount, " comments ");
    \u0275\u0275advance();
    \u0275\u0275property("articleId", ctx_r1.article().id);
  }
}
var ArticleDetailComponent = class _ArticleDetailComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.articleService = inject(ArticleService);
    this.authService = inject(AuthService);
    this.authGate = inject(AuthGateService);
    this.toastService = inject(ToastService);
    this.article = signal(null);
    this.isLoading = signal(false);
    this.error = signal(null);
    this.articleId = 0;
    this.authorInitials = computed(() => this.article()?.author.username.charAt(0).toUpperCase() ?? "");
    this.readTime = computed(() => {
      const words = (this.article()?.body ?? "").split(/\s+/).filter(Boolean).length;
      return Math.max(1, Math.ceil(words / 200));
    });
  }
  ngOnInit() {
    this.articleId = Number(this.route.snapshot.paramMap.get("id"));
    this.loadArticle();
  }
  /** Loads the article from the API. */
  loadArticle() {
    this.isLoading.set(true);
    this.error.set(null);
    this.articleService.getArticle(this.articleId).subscribe({
      next: (data) => {
        this.article.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set("Failed to load article");
        this.isLoading.set(false);
      }
    });
  }
  /** Optimistically applies a like/dislike reaction and calls the API. */
  onReact(type) {
    if (!this.authService.isAuthenticated()) {
      this.authGate.open();
      return;
    }
    const current = this.article();
    if (!current)
      return;
    const reactionType = type.toUpperCase();
    const wasActive = current.userReaction === reactionType;
    let newLike = current.likeCount;
    let newDislike = current.dislikeCount;
    const newReaction = wasActive ? null : reactionType;
    if (wasActive) {
      if (type === "like")
        newLike--;
      else
        newDislike--;
    } else {
      if (type === "like") {
        newLike++;
        if (current.userReaction === "DISLIKE")
          newDislike--;
      } else {
        newDislike++;
        if (current.userReaction === "LIKE")
          newLike--;
      }
    }
    this.article.set(__spreadProps(__spreadValues({}, current), { likeCount: newLike, dislikeCount: newDislike, userReaction: newReaction }));
    this.articleService.react(this.articleId, type).subscribe({
      next: (result) => this.article.update((a) => a ? __spreadValues(__spreadValues({}, a), result) : a),
      error: () => {
        this.article.set(current);
        this.toastService.error("Failed to update reaction");
      }
    });
  }
  formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
  static {
    this.\u0275fac = function ArticleDetailComponent_Factory(t) {
      return new (t || _ArticleDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ArticleDetailComponent, selectors: [["app-article-detail"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 4, vars: 1, consts: [[1, "max-w-2xl", "mx-auto", "px-5", "sm:px-6", "py-10"], [3, "rows"], [3, "retry", "message"], [1, "text-4xl", "sm:text-5xl", "font-bold", "text-gray-900", "leading-tight", "tracking-tight", "mb-6"], [1, "flex", "items-center", "gap-3", "mb-8"], [1, "w-10", "h-10", "rounded-full", "bg-gray-800", "text-white", "flex", "items-center", "justify-center", "text-sm", "font-bold", "shrink-0"], [1, "flex-1", "min-w-0"], [1, "flex", "items-center", "gap-2", "flex-wrap"], [1, "text-sm", "font-semibold", "text-gray-900"], [1, "text-xs", "px-2", "py-0.5", "rounded-full", "border", "border-gray-800", "text-gray-800", "text-[11px]", "font-medium", "hover:bg-gray-800", "hover:text-white", "transition-colors", "cursor-pointer", "select-none"], [1, "text-xs", "text-gray-400", "mt-0.5"], [1, "mb-10", "-mx-5", "sm:-mx-6"], [1, "article-body", "mb-10", 3, "innerHTML"], [1, "flex", "items-center", "gap-3", "py-5", "border-t", "border-b", "border-gray-200", "mb-10"], ["type", "button", 1, "flex", "items-center", "gap-2", "px-4", "py-2", "rounded-full", "border", "transition-all", "text-sm", "font-medium", "cursor-pointer", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", "stroke-width", "2", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"], [1, "flex", "items-center", "gap-2", "px-4", "py-2", "text-sm", "text-gray-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"], [3, "articleId"], ["loading", "eager", 1, "w-full", "object-cover", "max-h-[480px]", 3, "src", "alt"]], template: function ArticleDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, ArticleDetailComponent_Conditional_1_Template, 1, 2, "app-skeleton-loader", 1)(2, ArticleDetailComponent_Conditional_2_Template, 1, 1)(3, ArticleDetailComponent_Conditional_3_Template, 33, 17);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(1, ctx.isLoading() ? 1 : ctx.error() ? 2 : ctx.article() ? 3 : -1);
      }
    }, dependencies: [CommentThreadComponent, SkeletonLoaderComponent, ErrorMessageComponent, ArticleBodyPipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ArticleDetailComponent, { className: "ArticleDetailComponent" });
})();
export {
  ArticleDetailComponent
};
//# sourceMappingURL=chunk-OPUYXBLC.js.map
