import { Component, Input, OnInit, signal, inject } from '@angular/core';
import { IComment } from '@/app/shared/models/comment.model';
import { CommentService } from '@/app/features/comments/services/comment.service';
import { AuthService } from '@/app/core/services/auth.service';
import { AuthGateService } from '@/app/core/services/auth-gate.service';
import { CommentItemComponent } from '@/app/features/comments/comment-item/comment-item.component';
import { CommentFormComponent } from '@/app/features/comments/comment-form/comment-form.component';
import { SkeletonLoaderComponent } from '@/app/shared/ui/skeleton-loader/skeleton-loader.component';
import { ErrorMessageComponent } from '@/app/shared/ui/error-message/error-message.component';
import { EmptyStateComponent } from '@/app/shared/ui/empty-state/empty-state.component';

/**
 * Smart component that loads and displays the comment thread for an article.
 * Handles loading, empty, and error states. Supports adding root comments and replies.
 */
@Component({
  selector: 'app-comment-thread',
  standalone: true,
  imports: [
    CommentItemComponent,
    CommentFormComponent,
    SkeletonLoaderComponent,
    ErrorMessageComponent,
    EmptyStateComponent,
  ],
  template: `
    <section class="mt-10">
      <h2 class="text-xl font-bold text-brand mb-5">
        Comments
        @if (comments().length > 0) {
          <span class="text-sm font-normal text-gray-400 ml-2">({{ comments().length }})</span>
        }
      </h2>

      @if (isLoading()) {
        <div class="space-y-4">
          <app-skeleton-loader [rows]="['w-1/3', 'w-full', 'w-3/4']" />
          <app-skeleton-loader [rows]="['w-1/4', 'w-full', 'w-2/3']" />
        </div>
      } @else if (error()) {
        <app-error-message [message]="error()!" (retry)="loadComments()" />
      } @else if (comments().length === 0) {
        <app-empty-state
          message="No comments yet"
          subtitle="Be the first to start the conversation!"
        />
      } @else {
        <div class="flex flex-col gap-4">
          @for (comment of comments(); track comment.id) {
            <app-comment-item
              [comment]="comment"
              [isAuthenticated]="authService.isAuthenticated()"
              (replySubmitted)="onReplySubmitted($event)"
            />
          }
        </div>
      }

      <div class="mt-8 pt-6 border-t border-gray-200">
        @if (authService.isAuthenticated()) {
          <h3 class="text-sm font-semibold text-gray-700 mb-3">Leave a comment</h3>
          <app-comment-form (submitted)="onCommentSubmitted($event)" />
        } @else {
          <button
            type="button"
            (click)="openAuthGate()"
            class="w-full text-left px-4 py-3 rounded-xl border border-gray-200 text-gray-400 text-sm hover:border-gray-400 hover:text-gray-600 transition-colors bg-gray-50"
          >
            Sign in to leave a comment...
          </button>
        }
      </div>
    </section>
  `,
})
export class CommentThreadComponent implements OnInit {
  /** The article ID whose comments to load. */
  @Input({ required: true }) articleId!: number;

  protected readonly authService = inject(AuthService);
  private readonly authGate = inject(AuthGateService);
  private readonly commentService = inject(CommentService);

  protected readonly comments = signal<IComment[]>([]);
  protected readonly isLoading = signal(false);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadComments();
  }

  protected openAuthGate(): void {
    this.authGate.open();
  }

  /** Loads the comment thread from the API. */
  protected loadComments(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.commentService.getComments(this.articleId).subscribe({
      next: (data) => {
        this.comments.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Failed to load comments');
        this.isLoading.set(false);
      },
    });
  }

  /** Handles root comment submission. New comments initialize with zero reactions. */
  protected onCommentSubmitted(body: string): void {
    this.commentService.addComment(this.articleId, body).subscribe({
      next: (comment) => {
        const withReactions: IComment = {
          ...comment,
          likeCount: comment.likeCount ?? 0,
          dislikeCount: comment.dislikeCount ?? 0,
          userReaction: comment.userReaction ?? null,
          replies: comment.replies ?? [],
        };
        this.comments.update((list) => [withReactions, ...list]);
      },
    });
  }

  /** Handles reply submission from a CommentItemComponent. */
  protected onReplySubmitted(event: { parentId: number; body: string }): void {
    this.commentService.addReply(event.parentId, event.body).subscribe({
      next: (reply) => {
        const withReactions: IComment = {
          ...reply,
          likeCount: reply.likeCount ?? 0,
          dislikeCount: reply.dislikeCount ?? 0,
          userReaction: reply.userReaction ?? null,
          replies: reply.replies ?? [],
        };
        this.comments.update((list) =>
          list.map((c) =>
            c.id === event.parentId
              ? { ...c, replies: [...c.replies, withReactions] }
              : c,
          ),
        );
      },
    });
  }
}
