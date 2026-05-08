import {
  HttpClient,
  computed,
  environment,
  signal,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-E24KRSQY.js";

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  constructor(http) {
    this.http = http;
    this.TOKEN_KEY = "auth_token";
    this.USER_KEY = "auth_user";
    this._currentUser = signal(this.loadStoredUser());
    this.currentUser = this._currentUser.asReadonly();
    this.isAuthenticated = computed(() => this._currentUser() !== null);
  }
  /**
   * Authenticates user and stores JWT + user info in localStorage.
   */
  login(email, password) {
    return this.http.post(`${environment.apiUrl}/auth/login`, { email, password }).pipe(tap((response) => this.storeAuthData(response.data)));
  }
  /**
   * Registers a new user account.
   */
  register(username, email, password) {
    return this.http.post(`${environment.apiUrl}/auth/register`, { username, email, password });
  }
  /**
   * Clears all authentication state.
   */
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._currentUser.set(null);
  }
  /**
   * Returns the current JWT token or null if not authenticated.
   */
  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  /**
   * Returns the current user's database ID, or null if unauthenticated.
   */
  getCurrentUserId() {
    return this._currentUser()?.id ?? null;
  }
  storeAuthData(authData) {
    localStorage.setItem(this.TOKEN_KEY, authData.token);
    const user = { id: authData.userId, username: authData.username };
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this._currentUser.set(user);
  }
  loadStoredUser() {
    const stored = localStorage.getItem(this.USER_KEY);
    if (!stored)
      return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  static {
    this.\u0275fac = function AuthService_Factory(t) {
      return new (t || _AuthService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthService
};
//# sourceMappingURL=chunk-CGBIIZPU.js.map
