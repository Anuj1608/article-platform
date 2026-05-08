import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  inject,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IComment } from '@/app/shared/models/comment.model';
import { CommentService } from '@/app/features/comments/services/comment.service';
import { AuthGateService } from '@/app/core/services/auth-gate.service';
import { CommentFormComponent } from '@/app/features/comments/comment-form/comment-form.component';

/**
 * Presentational component that renders a single comment and its nested replies.
 * Manages local reaction state optimistically via a signal.
 * Recursively renders replies using itself.
 */
@Component({
  selector: 'app-comment-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommentFormComponent, CommentItemComponent],
  template: `
    <div class="flex flex-col gap-1">
      <!-- Comment body card -->
      <div class="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <!-- Author row -->
        <div class="flex items-center gap-2 mb-2">
          <div
            class="w-7 h-7 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold shrink-0"
          >
            {{ authorInitials }}
          </div>
          <span class="text-sm font-semibold text-gray-800">
            {{ localComment()?.author?.username }}
          </span>
          <span class="text-xs text-gray-400">{{ timeAgo(localComment()?.createdAt ?? '') }}</span>
        </div>

        <!-- Body -->
        <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap mb-3">
          {{ localComment()?.body }}
        </p>

        <!-- Action row: reactions + reply -->
        <div class="flex items-center gap-3 text-xs">
          <!-- Like button -->
          <button
            type="button"
            (click)="onReact('like')"
            class="flex items-center gap-1.5 transition-colors"
            [class]="localComment()?.userReaction === 'LIKE'
              ? 'text-action-primary font-semibold'
              : 'text-gray-400 hover:text-action-primary'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
            </svg>
            {{ localComment()?.likeCount }}
          </button>

          <!-- Dislike button -->
          <button
            type="button"
            (click)="onReact('dislike')"
            class="flex items-center gap-1.5 transition-colors"
            [class]="localComment()?.userReaction === 'DISLIKE'
              ? 'text-red-500 font-semibold'
              : 'text-gray-400 hover:text-red-400'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"/>
            </svg>
            {{ localComment()?.dislikeCount }}
          </button>

          <!-- Reply button (always visible, gates on auth) -->
          <button
            type="button"
            (click)="toggleReply()"
            class="ml-2 text-gray-400 hover:text-action-primary transition-colors"
          >
            {{ showReplyForm() ? 'Cancel' : 'Reply' }}
          </button>
        </div>
      </div>

      <!-- Reply form -->
      @if (showReplyForm()) {
        <div class="ml-8 mt-1">
          <app-comment-form
            placeholder="Write a reply..."
            (submitted)="onReply($event)"
          />
        </div>
      }

      <!-- Nested replies -->
      @if ((localComment()?.replies?.length ?? 0) > 0) {
        <div class="ml-8 border-l-2 border-gray-100 pl-4 flex flex-col gap-3 mt-2">
          @for (reply of localComment()!.replies; track reply.id) {
            <app-comment-item
              [comment]="reply"
              [isAuthenticated]="isAuthenticated"
              (replySubmitted)="replySubmitted.emit($event)"
            />
          }
        </div>
      }
    </div>
  `,
})
export class CommentItemComponent implements OnChanges {
  /** The comment to display. */
  @Input({ required: true }) comment!: IComment;
  /** Whether the current user is authenticated (controls reaction/reply visibility). */
  @Input() isAuthenticated = false;
  /** Emitted when the user submits a reply. Carries { parentId, body }. */
  @Output() replySubmitted = new EventEmitter<{ parentId: number; body: string }>();

  protected readonly localComment = signal<IComment | null>(null);
  protected readonly showReplyForm = signal(false);

  private readonly commentService = inject(CommentService);
  private readonly authGate = inject(AuthGateService);

  ngOnChanges(): void {
    this.localComment.set(this.comment);
  }

  protected get authorInitials(): string {
    return this.localComment()?.author.username.charAt(0).toUpperCase() ?? '';
  }

  protected toggleReply(): void {
    if (!this.isAuthenticated) {
      this.authGate.open();
      return;
    }
    this.showReplyForm.update((v) => !v);
  }

  protected onReply(body: string): void {
    const c = this.localComment();
    if (c) {
      this.replySubmitted.emit({ parentId: c.id, body });
    }
    this.showReplyForm.set(false);
  }

  protected onReact(type: 'like' | 'dislike'): void {
    const c = this.localComment();
    if (!c) return;
    if (!this.isAuthenticated) {
      this.authGate.open();
      return;
    }

    const rType = type.toUpperCase() as 'LIKE' | 'DISLIKE';
    const wasActive = c.userReaction === rType;
    let lk = c.likeCount;
    let dk = c.dislikeCount;
    const nr: 'LIKE' | 'DISLIKE' | null = wasActive ? null : rType;

    if (wasActive) {
      if (type === 'like') lk--; else dk--;
    } else {
      if (type === 'like') {
        lk++;
        if (c.userReaction === 'DISLIKE') dk--;
      } else {
        dk++;
        if (c.userReaction === 'LIKE') lk--;
      }
    }

    this.localComment.set({ ...c, likeCount: lk, dislikeCount: dk, userReaction: nr });

    this.commentService.react(c.id, type).subscribe({
      next: (r) => this.localComment.update((x) => (x ? { ...x, ...r } : x)),
      error: () => this.localComment.set(c),
    });
  }

  protected timeAgo(dateStr: string): string {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
    const months = Math.floor(days / 30);
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  }
}
