import { Component, signal, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '@/app/features/articles/services/article.service';
import { ToastService } from '@/app/core/services/toast.service';
import { MentionInputComponent } from '@/app/features/comments/mention-input/mention-input.component';
import { ErrorMessageComponent } from '@/app/shared/ui/error-message/error-message.component';

/**
 * Smart component for creating a new article.
 * Auth-gated via the route (authGuard). Body textarea supports @mention autocomplete.
 */
@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [ReactiveFormsModule, MentionInputComponent, ErrorMessageComponent],
  template: `
    <div class="max-w-2xl mx-auto py-10 px-6">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-brand">New Article</h1>
        <p class="text-gray-500 mt-1">Share your ideas with the community.</p>
      </div>

      @if (error()) {
        <app-error-message [message]="error()!" [showRetry]="false" class="mb-4" />
      }

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
          <input
            id="title"
            formControlName="title"
            type="text"
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-action-primary focus:border-transparent transition"
            placeholder="Give your article a compelling title"
          />
          @if (form.get('title')?.invalid && form.get('title')?.touched) {
            <p class="text-red-600 text-xs mt-1">Title is required (max 500 characters)</p>
          }
        </div>

        <div>
          <label for="coverImageUrl" class="block text-sm font-medium text-gray-700 mb-1.5">
            Cover Image URL
            <span class="text-gray-400 font-normal ml-1">(optional)</span>
          </label>
          <input
            id="coverImageUrl"
            formControlName="coverImageUrl"
            type="url"
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-action-primary focus:border-transparent transition"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Body</label>
          <p class="text-xs text-gray-400 mb-2">Tip: embed images with <code class="bg-gray-100 px-1 rounded">![caption](url)</code> and bold with <code class="bg-gray-100 px-1 rounded">**text**</code></p>
          <app-mention-input
            #bodyInput
            placeholder="Write your article here... Use @ to mention users"
            (valueChange)="bodyValue = $event"
          />
          @if (bodyTouched && !bodyValue.trim()) {
            <p class="text-red-600 text-xs mt-1">Body is required</p>
          }
        </div>

        <div class="flex gap-3 justify-end pt-2">
          <button
            type="button"
            (click)="router.navigate(['/articles'])"
            class="px-5 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            [disabled]="isLoading() || form.invalid || !bodyValue.trim()"
            class="px-5 py-2.5 bg-action-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            @if (isLoading()) {
              Publishing&hellip;
            } @else {
              Publish Article
            }
          </button>
        </div>
      </form>
    </div>
  `,
})
export class CreateArticleComponent {
  @ViewChild('bodyInput') private readonly bodyInput!: MentionInputComponent;

  private readonly fb = inject(FormBuilder);
  private readonly articleService = inject(ArticleService);
  protected readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  protected readonly isLoading = signal(false);
  protected readonly error = signal<string | null>(null);

  protected bodyValue = '';
  protected bodyTouched = false;

  protected readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(500)]],
    coverImageUrl: ['', Validators.maxLength(500)],
  });

  /** Submits the new article to the API and navigates to its detail page. */
  protected onSubmit(): void {
    this.bodyTouched = true;
    if (this.form.invalid || !this.bodyValue.trim()) return;

    const { title, coverImageUrl } = this.form.getRawValue();
    this.isLoading.set(true);
    this.error.set(null);

    this.articleService.createArticle(title ?? '', this.bodyValue, coverImageUrl ?? undefined).subscribe({
      next: (article) => {
        this.toastService.success('Article published!');
        this.router.navigate(['/articles', article.id]);
      },
      error: () => {
        this.error.set('Failed to publish article. Please try again.');
        this.isLoading.set(false);
      },
    });
  }
}
