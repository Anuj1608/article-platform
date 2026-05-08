import {
  Component,
  inject,
  signal,
  computed,
  HostListener,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  RouterLink,
  RouterOutlet,
  RouterLinkActive,
  Router,
  NavigationEnd,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '@/app/core/services/auth.service';
import { AuthGateService } from '@/app/core/services/auth-gate.service';
import { ToastComponent } from '@/app/shared/ui/toast/toast.component';
import { AuthGateModalComponent } from '@/app/shared/ui/auth-gate-modal/auth-gate-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastComponent, AuthGateModalComponent],
  template: `
    <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
      <nav class="max-w-5xl mx-auto px-6 h-14 flex items-center gap-4">

        <!-- Logo -->
        <a
          routerLink="/articles"
          class="text-xl font-bold tracking-tight select-none text-gray-900 shrink-0"
          (click)="closeSearch()"
        >
          Article<span class="text-green-600">Platform</span>
        </a>

        <!-- Search bar (centre, expands) -->
        <div class="flex-1 flex items-center justify-center">
          @if (searchOpen()) {
            <form
              class="w-full max-w-md flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5"
              (submit)="submitSearch($event)"
            >
              <svg class="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                #searchInput
                type="text"
                [value]="searchTerm()"
                (input)="searchTerm.set(searchInput.value)"
                placeholder="Search articles..."
                class="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
                autocomplete="off"
              />
              @if (searchTerm()) {
                <button
                  type="button"
                  (click)="clearSearch()"
                  class="text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              }
            </form>
          }
        </div>

        <!-- Right side -->
        <div class="flex items-center gap-3 text-sm shrink-0">
          <!-- Search toggle -->
          <button
            type="button"
            (click)="toggleSearch()"
            [class]="searchOpen() ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'"
            class="transition-colors"
            aria-label="Search"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          @if (authService.isAuthenticated()) {
            <!-- Write button -->
            <a
              routerLink="/articles/create"
              class="hidden sm:flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors text-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Write
            </a>

            <!-- Avatar + dropdown -->
            <div class="relative">
              <button
                type="button"
                (click)="toggleDropdown()"
                class="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-gray-100 transition-colors focus:outline-none"
                aria-label="User menu"
              >
                <div class="w-8 h-8 rounded-full bg-action-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {{ initials() }}
                </div>
                <span class="text-gray-700 font-medium hidden sm:block">
                  {{ authService.currentUser()?.username }}
                </span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform"
                  [class.rotate-180]="dropdownOpen()"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              @if (dropdownOpen()) {
                <div class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <a
                    routerLink="/articles/create"
                    class="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg class="w-4 h-4 text-action-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    New Article
                  </a>
                  <hr class="my-1 border-gray-100" />
                  <button
                    type="button"
                    (click)="signOut()"
                    class="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </button>
                </div>
              }
            </div>
          } @else {
            <a
              routerLink="/login"
              class="text-gray-600 hover:text-brand transition-colors px-3 py-1.5 rounded-lg"
            >
              Sign In
            </a>
            <a
              routerLink="/register"
              class="px-4 py-1.5 bg-action-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Register
            </a>
          }
        </div>
      </nav>
    </header>

    <main class="min-h-screen bg-white">
      <router-outlet />
    </main>

    <app-toast />

    @if (authGate.visible()) {
      <app-auth-gate-modal />
    }
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  protected readonly authService = inject(AuthService);
  protected readonly authGate = inject(AuthGateService);
  private readonly router = inject(Router);

  protected readonly dropdownOpen = signal(false);
  protected readonly searchOpen = signal(false);
  protected readonly searchTerm = signal('');

  protected readonly initials = computed(
    () => this.authService.currentUser()?.username?.charAt(0)?.toUpperCase() ?? '',
  );

  @ViewChild('searchInput') private searchInputRef?: ElementRef<HTMLInputElement>;

  private routerSub: Subscription | null = null;

  ngOnInit(): void {
    this.routerSub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.dropdownOpen.set(false));
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  protected toggleSearch(): void {
    this.searchOpen.update((v) => !v);
    if (this.searchOpen()) {
      setTimeout(() => this.searchInputRef?.nativeElement.focus(), 50);
    } else {
      this.clearSearch();
    }
  }

  protected closeSearch(): void {
    this.searchOpen.set(false);
    this.searchTerm.set('');
  }

  protected clearSearch(): void {
    this.searchTerm.set('');
    this.router.navigate(['/articles'], { queryParams: {} });
    setTimeout(() => this.searchInputRef?.nativeElement.focus(), 50);
  }

  protected submitSearch(event: Event): void {
    event.preventDefault();
    const q = this.searchTerm().trim();
    if (q) {
      this.router.navigate(['/articles'], { queryParams: { q } });
    } else {
      this.router.navigate(['/articles'], { queryParams: {} });
    }
  }

  protected toggleDropdown(): void {
    this.dropdownOpen.update((v) => !v);
  }

  protected signOut(): void {
    this.dropdownOpen.set(false);
    this.authService.logout();
    this.router.navigate(['/articles']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('[aria-label="User menu"]') && !target.closest('.absolute.right-0')) {
      this.dropdownOpen.set(false);
    }
  }
}
