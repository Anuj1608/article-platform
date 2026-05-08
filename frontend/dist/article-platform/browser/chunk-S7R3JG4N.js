import {
  HttpClient,
  HttpParams,
  environment,
  map,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-E24KRSQY.js";

// src/app/features/articles/services/article.service.ts
var ArticleService = class _ArticleService {
  constructor(http) {
    this.http = http;
    this.baseUrl = `${environment.apiUrl}/articles`;
  }
  /** Returns a paginated list of articles sorted by newest first. */
  getArticles(page, size) {
    const params = new HttpParams().set("page", page).set("size", size);
    return this.http.get(this.baseUrl, { params }).pipe(map((r) => r.data));
  }
  /** Searches articles by title and body content. */
  searchArticles(query, page, size) {
    const params = new HttpParams().set("q", query).set("page", page).set("size", size);
    return this.http.get(`${this.baseUrl}/search`, { params }).pipe(map((r) => r.data));
  }
  /** Returns the full article detail including reaction counts. */
  getArticle(id) {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(map((r) => r.data));
  }
  /** Creates a new article. Requires authentication. */
  createArticle(title, body, coverImageUrl) {
    return this.http.post(this.baseUrl, { title, body, coverImageUrl: coverImageUrl || null }).pipe(map((r) => r.data));
  }
  /** Reacts to an article with like or dislike. Toggling the same reaction removes it. */
  react(id, type) {
    return this.http.post(`${this.baseUrl}/${id}/${type}`, {}).pipe(map((r) => r.data));
  }
  static {
    this.\u0275fac = function ArticleService_Factory(t) {
      return new (t || _ArticleService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ArticleService, factory: _ArticleService.\u0275fac, providedIn: "root" });
  }
};

export {
  ArticleService
};
//# sourceMappingURL=chunk-S7R3JG4N.js.map
