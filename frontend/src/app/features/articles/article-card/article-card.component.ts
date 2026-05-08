import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IArticleListItem } from '@/app/shared/models/article.model';

/**
 * Presentational card for a single article in the list.
 * Medium-style layout: author top, title + excerpt left, thumbnail right.
 */
@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="py-8 border-b border-gray-200 last:border-b-0 group">
      <a [routerLink]="['/articles', article.id]" class="flex items-start gap-4 sm:gap-6">

        <!-- Left: text content -->
        <div class="flex-1 min-w-0">
          <!-- Author row -->
          <div class="flex items-center gap-2 mb-2">
            <div class="w-6 h-6 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-xs font-bold shrink-0">
              {{ initials }}
            </div>
            <span class="text-sm text-gray-600 font-medium">{{ article.author.username }}</span>
          </div>

          <!-- Title -->
          <h2 class="text-xl font-bold text-gray-900 leading-snug mb-1 line-clamp-3 group-hover:text-gray-600 transition-colors">
            {{ article.title }}
          </h2>

          <!-- Excerpt -->
          @if (article.excerpt) {
            <p class="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3 hidden sm:block">
              {{ article.excerpt }}
            </p>
          }

          <!-- Meta row -->
          <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400 mt-3">
            <span>{{ formatDate(article.createdAt) }}</span>
            <span aria-hidden="true">&middot;</span>
            <!-- Like -->
            <span class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
              </svg>
              {{ article.likeCount }}
            </span>
            <!-- Dislike -->
            <span class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"/>
              </svg>
              {{ article.dislikeCount }}
            </span>
            <!-- Comments -->
            <span class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              {{ article.commentCount }}
            </span>
          </div>
        </div>

        <!-- Right: thumbnail -->
        @if (article.coverImageUrl) {
          <div class="shrink-0">
            <img
              [src]="article.coverImageUrl"
              [alt]="article.title"
              class="w-24 h-16 sm:w-32 sm:h-24 object-cover rounded"
              loading="lazy"
            />
          </div>
        }

      </a>
    </article>
  `,
})
export class ArticleCardComponent {
  @Input({ required: true }) article!: IArticleListItem;

  protected get initials(): string {
    return this.article.author.username.charAt(0).toUpperCase();
  }

  protected formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}
