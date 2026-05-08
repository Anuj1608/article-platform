import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { IArticleListItem } from '@/app/shared/models/article.model';
import { ArticleService } from '@/app/features/articles/services/article.service';
import { AuthService } from '@/app/core/services/auth.service';
import { ArticleCardComponent } from '@/app/features/articles/article-card/article-card.component';
import { SkeletonLoaderComponent } from '@/app/shared/ui/skeleton-loader/skeleton-loader.component';
import { EmptyStateComponent } from '@/app/shared/ui/empty-state/empty-state.component';
import { ErrorMessageComponent } from '@/app/shared/ui/error-message/error-message.component';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [
    RouterLink,
    ArticleCardComponent,
    SkeletonLoaderComponent,
    EmptyStateComponent,
    ErrorMessageComponent,
  ],
  template: `
    <div class="max-w-2xl mx-auto px-5 sm:px-6 py-10">

      @if (searchQuery()) {
        <!-- Search results header -->
        <div class="mb-6">
          <p class="text-sm text-gray-400">
            Results for
            <span class="font-semibold text-gray-700">"{{ searchQuery() }}"</span>
          </p>
          <button
            type="button"
            (click)="clearSearch()"
            class="text-xs text-green-600 hover:text-green-700 mt-1 flex items-center gap-1"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear search
          </button>
        </div>
      }

      @if (isLoading()) {
        @for (n of skeletonRows; track n) {
          <app-skeleton-loader [rows]="['w-1/3', 'w-full', 'w-5/6', 'w-1/4']" />
        }
      } @else if (error()) {
        <app-error-message [message]="error()!" (retry)="reload()" />
      } @else if (articles().length === 0) {
        <app-empty-state
          [message]="searchQuery() ? 'No results found' : 'No articles yet'"
          [subtitle]="searchQuery() ? 'Try a different search term.' : 'Be the first to share your ideas!'"
        />
      } @else {
        <div>
          @for (article of articles(); track article.id) {
            <app-article-card [article]="article" />
          }
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between mt-8 pt-6">
          <button
            type="button"
            (click)="changePage(currentPage() - 1)"
            [disabled]="currentPage() === 0"
            class="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-full disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <span class="text-sm text-gray-400">
            Page {{ currentPage() + 1 }} of {{ totalPages() }}
          </span>
          <button
            type="button"
            (click)="changePage(currentPage() + 1)"
            [disabled]="currentPage() >= totalPages() - 1"
            class="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-full disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            Next
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      }
    </div>
  `,
})
export class ArticleListComponent implements OnInit {
  protected readonly authService = inject(AuthService);
  private readonly articleService = inject(ArticleService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly articles = signal<IArticleListItem[]>([]);
  protected readonly isLoading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly currentPage = signal(0);
  protected readonly totalPages = signal(0);
  protected readonly searchQuery = signal('');

  protected readonly skeletonRows = [1, 2, 3, 4];

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const q = params.get('q')?.trim() ?? '';
      this.searchQuery.set(q);
      this.currentPage.set(0);
      this.load(0, q);
    });
  }

  protected reload(): void {
    this.load(this.currentPage(), this.searchQuery());
  }

  protected changePage(page: number): void {
    if (page < 0) return;
    this.router.navigate([], {
      queryParams: { page: page > 0 ? page : null, q: this.searchQuery() || null },
      queryParamsHandling: 'merge',
    });
    this.load(page, this.searchQuery());
  }

  protected clearSearch(): void {
    this.router.navigate([], { queryParams: {} });
  }

  private load(page: number, query: string): void {
    this.isLoading.set(true);
    this.error.set(null);

    const source$ = query
      ? this.articleService.searchArticles(query, page, PAGE_SIZE)
      : this.articleService.getArticles(page, PAGE_SIZE);

    source$.subscribe({
      next: (result) => {
        this.articles.set(result.content);
        this.currentPage.set(result.number);
        this.totalPages.set(result.totalPages);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Failed to load articles');
        this.isLoading.set(false);
      },
    });
  }
}
