import {
  EmptyStateComponent,
  SkeletonLoaderComponent
} from "./chunk-FOB27XJ3.js";
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
  Router,
  RouterLink,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-E24KRSQY.js";

// src/app/features/articles/article-card/article-card.component.ts
var _c0 = (a0) => ["/articles", a0];
function ArticleCardComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.article.excerpt, " ");
  }
}
function ArticleCardComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275element(1, "img", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r0.article.coverImageUrl, \u0275\u0275sanitizeUrl)("alt", ctx_r0.article.title);
  }
}
var ArticleCardComponent = class _ArticleCardComponent {
  get initials() {
    return this.article.author.username.charAt(0).toUpperCase();
  }
  formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  static {
    this.\u0275fac = function ArticleCardComponent_Factory(t) {
      return new (t || _ArticleCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ArticleCardComponent, selectors: [["app-article-card"]], inputs: { article: "article" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 29, vars: 12, consts: [[1, "py-8", "border-b", "border-gray-200", "last:border-b-0", "group"], [1, "flex", "items-start", "gap-4", "sm:gap-6", 3, "routerLink"], [1, "flex-1", "min-w-0"], [1, "flex", "items-center", "gap-2", "mb-2"], [1, "w-6", "h-6", "rounded-full", "bg-gray-300", "text-gray-700", "flex", "items-center", "justify-center", "text-xs", "font-bold", "shrink-0"], [1, "text-sm", "text-gray-600", "font-medium"], [1, "text-xl", "font-bold", "text-gray-900", "leading-snug", "mb-1", "line-clamp-3", "group-hover:text-gray-600", "transition-colors"], [1, "text-gray-500", "text-sm", "leading-relaxed", "line-clamp-2", "mb-3", "hidden", "sm:block"], [1, "flex", "flex-wrap", "items-center", "gap-x-3", "gap-y-1", "text-xs", "text-gray-400", "mt-3"], ["aria-hidden", "true"], [1, "flex", "items-center", "gap-1"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", "stroke-width", "2", 1, "w-3.5", "h-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"], [1, "shrink-0"], ["loading", "lazy", 1, "w-24", "h-16", "sm:w-32", "sm:h-24", "object-cover", "rounded", 3, "src", "alt"]], template: function ArticleCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "article", 0)(1, "a", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "span", 5);
        \u0275\u0275text(7);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "h2", 6);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd();
        \u0275\u0275template(10, ArticleCardComponent_Conditional_10_Template, 2, 1, "p", 7);
        \u0275\u0275elementStart(11, "div", 8)(12, "span");
        \u0275\u0275text(13);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "span", 9);
        \u0275\u0275text(15, "\xB7");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "span", 10);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(17, "svg", 11);
        \u0275\u0275element(18, "path", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275text(19);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(20, "span", 10);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(21, "svg", 11);
        \u0275\u0275element(22, "path", 13);
        \u0275\u0275elementEnd();
        \u0275\u0275text(23);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(24, "span", 10);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(25, "svg", 11);
        \u0275\u0275element(26, "path", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275text(27);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(28, ArticleCardComponent_Conditional_28_Template, 2, 2, "div", 15);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(10, _c0, ctx.article.id));
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.initials, " ");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.article.author.username);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", ctx.article.title, " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(10, ctx.article.excerpt ? 10 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.formatDate(ctx.article.createdAt));
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate1(" ", ctx.article.likeCount, " ");
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.article.dislikeCount, " ");
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.article.commentCount, " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(28, ctx.article.coverImageUrl ? 28 : -1);
      }
    }, dependencies: [RouterLink], encapsulation: 2, changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ArticleCardComponent, { className: "ArticleCardComponent" });
})();

// src/app/features/articles/article-list/article-list.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c02 = () => ["w-1/3", "w-full", "w-5/6", "w-1/4"];
function ArticleListComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "p", 2);
    \u0275\u0275text(2, " Results for ");
    \u0275\u0275elementStart(3, "span", 3);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 4);
    \u0275\u0275listener("click", function ArticleListComponent_Conditional_1_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 5);
    \u0275\u0275element(7, "path", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Clear search ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1('"', ctx_r1.searchQuery(), '"');
  }
}
function ArticleListComponent_Conditional_2_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-skeleton-loader", 7);
  }
  if (rf & 2) {
    \u0275\u0275property("rows", \u0275\u0275pureFunction0(1, _c02));
  }
}
function ArticleListComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ArticleListComponent_Conditional_2_For_1_Template, 1, 2, "app-skeleton-loader", 7, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.skeletonRows);
  }
}
function ArticleListComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-error-message", 8);
    \u0275\u0275listener("retry", function ArticleListComponent_Conditional_3_Template_app_error_message_retry_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reload());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("message", ctx_r1.error());
  }
}
function ArticleListComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-empty-state", 9);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("message", ctx_r1.searchQuery() ? "No results found" : "No articles yet")("subtitle", ctx_r1.searchQuery() ? "Try a different search term." : "Be the first to share your ideas!");
  }
}
function ArticleListComponent_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-article-card", 10);
  }
  if (rf & 2) {
    const article_r5 = ctx.$implicit;
    \u0275\u0275property("article", article_r5);
  }
}
function ArticleListComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275repeaterCreate(1, ArticleListComponent_Conditional_5_For_2_Template, 1, 1, "app-article-card", 10, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 11)(4, "button", 12);
    \u0275\u0275listener("click", function ArticleListComponent_Conditional_5_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.changePage(ctx_r1.currentPage() - 1));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 13);
    \u0275\u0275element(6, "path", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Previous ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "span", 2);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 12);
    \u0275\u0275listener("click", function ArticleListComponent_Conditional_5_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.changePage(ctx_r1.currentPage() + 1));
    });
    \u0275\u0275text(11, " Next ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 13);
    \u0275\u0275element(13, "path", 15);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.articles());
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.currentPage() === 0);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" Page ", ctx_r1.currentPage() + 1, " of ", ctx_r1.totalPages(), " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage() >= ctx_r1.totalPages() - 1);
  }
}
var PAGE_SIZE = 10;
var ArticleListComponent = class _ArticleListComponent {
  constructor() {
    this.authService = inject(AuthService);
    this.articleService = inject(ArticleService);
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.articles = signal([]);
    this.isLoading = signal(false);
    this.error = signal(null);
    this.currentPage = signal(0);
    this.totalPages = signal(0);
    this.searchQuery = signal("");
    this.skeletonRows = [1, 2, 3, 4];
  }
  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const q = params.get("q")?.trim() ?? "";
      this.searchQuery.set(q);
      this.currentPage.set(0);
      this.load(0, q);
    });
  }
  reload() {
    this.load(this.currentPage(), this.searchQuery());
  }
  changePage(page) {
    if (page < 0)
      return;
    this.router.navigate([], {
      queryParams: { page: page > 0 ? page : null, q: this.searchQuery() || null },
      queryParamsHandling: "merge"
    });
    this.load(page, this.searchQuery());
  }
  clearSearch() {
    this.router.navigate([], { queryParams: {} });
  }
  load(page, query) {
    this.isLoading.set(true);
    this.error.set(null);
    const source$ = query ? this.articleService.searchArticles(query, page, PAGE_SIZE) : this.articleService.getArticles(page, PAGE_SIZE);
    source$.subscribe({
      next: (result) => {
        this.articles.set(result.content);
        this.currentPage.set(result.number);
        this.totalPages.set(result.totalPages);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set("Failed to load articles");
        this.isLoading.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function ArticleListComponent_Factory(t) {
      return new (t || _ArticleListComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ArticleListComponent, selectors: [["app-article-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 2, consts: [[1, "max-w-2xl", "mx-auto", "px-5", "sm:px-6", "py-10"], [1, "mb-6"], [1, "text-sm", "text-gray-400"], [1, "font-semibold", "text-gray-700"], ["type", "button", 1, "text-xs", "text-green-600", "hover:text-green-700", "mt-1", "flex", "items-center", "gap-1", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", "stroke-width", "2.5", 1, "w-3", "h-3"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M6 18L18 6M6 6l12 12"], [3, "rows"], [3, "retry", "message"], [3, "message", "subtitle"], [3, "article"], [1, "flex", "items-center", "justify-between", "mt-8", "pt-6"], ["type", "button", 1, "flex", "items-center", "gap-2", "px-4", "py-2", "text-sm", "text-gray-600", "border", "border-gray-300", "rounded-full", "disabled:opacity-40", "hover:bg-gray-50", "transition-colors", 3, "click", "disabled"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", "stroke-width", "2", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M15 19l-7-7 7-7"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M9 5l7 7-7 7"]], template: function ArticleListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, ArticleListComponent_Conditional_1_Template, 9, 1, "div", 1)(2, ArticleListComponent_Conditional_2_Template, 2, 0)(3, ArticleListComponent_Conditional_3_Template, 1, 1)(4, ArticleListComponent_Conditional_4_Template, 1, 2)(5, ArticleListComponent_Conditional_5_Template, 14, 4);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(1, ctx.searchQuery() ? 1 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(2, ctx.isLoading() ? 2 : ctx.error() ? 3 : ctx.articles().length === 0 ? 4 : 5);
      }
    }, dependencies: [
      ArticleCardComponent,
      SkeletonLoaderComponent,
      EmptyStateComponent,
      ErrorMessageComponent
    ], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ArticleListComponent, { className: "ArticleListComponent" });
})();
export {
  ArticleListComponent
};
//# sourceMappingURL=chunk-DJKME2QC.js.map
