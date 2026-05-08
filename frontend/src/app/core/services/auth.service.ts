import { Injectable, signal, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { IUser } from "@/app/shared/models/user.model";
import { IAuthResponse } from "@/app/shared/models/auth.model";
import { ApiSuccessResponseType } from "@/app/shared/models/api.model";
import { environment } from "@/environments/environment";

/** Manages authentication state and JWT token storage. */
@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly TOKEN_KEY = "auth_token";
  private readonly USER_KEY = "auth_user";

  private readonly _currentUser = signal<IUser | null>(this.loadStoredUser());

  /** Read-only signal of the currently authenticated user. */
  readonly currentUser = this._currentUser.asReadonly();

  /** Computed boolean — true if a user is currently authenticated. */
  readonly isAuthenticated = computed(() => this._currentUser() !== null);

  constructor(private readonly http: HttpClient) {}

  /**
   * Authenticates user and stores JWT + user info in localStorage.
   */
  login(
    email: string,
    password: string,
  ): Observable<ApiSuccessResponseType<IAuthResponse>> {
    return this.http
      .post<
        ApiSuccessResponseType<IAuthResponse>
      >(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(tap((response) => this.storeAuthData(response.data)));
  }

  /**
   * Registers a new user account.
   */
  register(
    username: string,
    email: string,
    password: string,
  ): Observable<ApiSuccessResponseType<IAuthResponse>> {
    return this.http.post<ApiSuccessResponseType<IAuthResponse>>(
      `${environment.apiUrl}/auth/register`,
      { username, email, password },
    );
  }

  /**
   * Clears all authentication state.
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._currentUser.set(null);
  }

  /**
   * Returns the current JWT token or null if not authenticated.
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Returns the current user's database ID, or null if unauthenticated.
   */
  getCurrentUserId(): number | null {
    return this._currentUser()?.id ?? null;
  }

  private storeAuthData(authData: IAuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authData.token);
    const user: IUser = { id: authData.userId, username: authData.username };
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this._currentUser.set(user);
  }

  private loadStoredUser(): IUser | null {
    const stored = localStorage.getItem(this.USER_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as IUser;
    } catch {
      return null;
    }
  }
}
