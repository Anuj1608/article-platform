import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from '@/app/shared/models/article.model';
import { ArticleService } from '@/app/features/articles/services/article.service';
import { AuthService } from '@/app/core/services/auth.service';
import { AuthGateService } from '@/app/core/services/auth-gate.service';
import { ToastService } from '@/app/core/services/toast.service';
import { ArticleBodyPipe } from '@/app/shared/pipes/article-body.pipe';
import { CommentThreadComponent } from '@/app/features/comments/comment-thread/comment-thread.component';
import { SkeletonLoaderComponent } from '@/app/shared/ui/skeleton-loader/skeleton-loader.component';
import { ErrorMessageComponent } from '@/app/shared/ui/error-message/error-message.component';

/**
 * Smart component displaying full article detail with reactions and comment thread.
 */
@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommentThreadComponent, SkeletonLoaderComponent, ErrorMessageComponent, ArticleBodyPipe],
  template: `
    <div class="max-w-2xl mx-auto px-5 sm:px-6 py-10">
      @if (isLoading()) {
        <app-skeleton-loader [rows]="['w-2/3', 'w-1/3', 'w-full', 'w-full', 'w-3/4', 'w-full', 'w-5/6']" />
      } @else if (error()) {
        <app-error-message [message]="error()!" (retry)="loadArticle()" />
      } @else if (article()) {
        <article>
          <!-- Title -->
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            {{ article()!.title }}
          </h1>

          <!-- Author row -->
          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-bold shrink-0">
              {{ authorInitials() }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-sm font-semibold text-gray-900">{{ article()!.author.username }}</span>
                <span class="text-xs px-2 py-0.5 rounded-full border border-gray-800 text-gray-800 text-[11px] font-medium hover:bg-gray-800 hover:text-white transition-colors cursor-pointer select-none">
                  Follow
                </span>
              </div>
              <p class="text-xs text-gray-400 mt-0.5">
                {{ formatDate(article()!.createdAt) }} &middot; {{ readTime() }} min read
              </p>
            </div>
          </div>

          <!-- Hero image (full-width, below author row) -->
          @if (article()!.coverImageUrl) {
            <div class="mb-10 -mx-5 sm:-mx-6">
              <img
                [src]="article()!.coverImageUrl!"
                [alt]="article()!.title"
                class="w-full object-cover max-h-[480px]"
                loading="eager"
              />
            </div>
          }

          <!-- Body — serif font via .article-body class -->
          <div
            class="article-body mb-10"
            [innerHTML]="article()!.body | articleBody"
          ></div>

          <!-- Reaction bar -->
          <div class="flex items-center gap-3 py-5 border-t border-b border-gray-200 mb-10">
            <!-- Like button -->
            <button
              type="button"
              (click)="onReact('like')"
              class="flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm font-medium cursor-pointer"
              [class]="article()!.userReaction === 'LIKE'
                ? 'border-action-primary bg-action-primary text-white'
                : 'border-gray-200 text-gray-500 hover:border-action-primary hover:text-action-primary'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
              </svg>
              <span>{{ article()!.likeCount }}</span>
            </button>

            <!-- Dislike button -->
            <button
              type="button"
              (click)="onReact('dislike')"
              class="flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm font-medium cursor-pointer"
              [class]="article()!.userReaction === 'DISLIKE'
                ? 'border-red-500 bg-red-500 text-white'
                : 'border-gray-200 text-gray-500 hover:border-red-400 hover:text-red-500'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"/>
              </svg>
              <span>{{ article()!.dislikeCount }}</span>
            </button>

            <!-- Comment count -->
            <span class="flex items-center gap-2 px-4 py-2 text-sm text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              {{ article()!.commentCount }} comments
            </span>
          </div>
        </article>

        <app-comment-thread [articleId]="article()!.id" />
      }
    </div>
  `,
})
export class ArticleDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly articleService = inject(ArticleService);
  protected readonly authService = inject(AuthService);
  private readonly authGate = inject(AuthGateService);
  private readonly toastService = inject(ToastService);

  protected readonly article = signal<IArticle | null>(null);
  protected readonly isLoading = signal(false);
  protected readonly error = signal<string | null>(null);

  private articleId = 0;

  protected readonly authorInitials = computed(
    () => this.article()?.author.username.charAt(0).toUpperCase() ?? '',
  );

  protected readonly readTime = computed(() => {
    const words = (this.article()?.body ?? '').split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  });

  ngOnInit(): void {
    this.articleId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadArticle();
  }

  /** Loads the article from the API. */
  protected loadArticle(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.articleService.getArticle(this.articleId).subscribe({
      next: (data) => {
        this.article.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Failed to load article');
        this.isLoading.set(false);
      },
    });
  }

  /** Optimistically applies a like/dislike reaction and calls the API. */
  protected onReact(type: 'like' | 'dislike'): void {
    if (!this.authService.isAuthenticated()) {
      this.authGate.open();
      return;
    }
    const current = this.article();
    if (!current) return;

    const reactionType = type.toUpperCase() as 'LIKE' | 'DISLIKE';
    const wasActive = current.userReaction === reactionType;

    let newLike = current.likeCount;
    let newDislike = current.dislikeCount;
    const newReaction: 'LIKE' | 'DISLIKE' | null = wasActive ? null : reactionType;

    if (wasActive) {
      if (type === 'like') newLike--; else newDislike--;
    } else {
      if (type === 'like') {
        newLike++;
        if (current.userReaction === 'DISLIKE') newDislike--;
      } else {
        newDislike++;
        if (current.userReaction === 'LIKE') newLike--;
      }
    }

    this.article.set({ ...current, likeCount: newLike, dislikeCount: newDislike, userReaction: newReaction });

    this.articleService.react(this.articleId, type).subscribe({
      next: (result) => this.article.update((a) => (a ? { ...a, ...result } : a)),
      error: () => {
        this.article.set(current);
        this.toastService.error('Failed to update reaction');
      },
    });
  }

  protected formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
