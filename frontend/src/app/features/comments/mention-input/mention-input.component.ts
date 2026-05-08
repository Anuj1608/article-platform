import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  inject,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Subject, debounceTime, distinctUntilChanged, switchMap } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IUser } from "@/app/shared/models/user.model";
import { UserSearchService } from "@/app/features/auth/services/user-search.service";

/**
 * Textarea with @mention autocomplete.
 * Detects the @ trigger character, queries the UserSearchService with a 300ms debounce,
 * and shows a dropdown of matching users. On selection, replaces the partial @mention.
 */
@Component({
  selector: "app-mention-input",
  standalone: true,
  template: `
    <div class="relative">
      <textarea
        #textarea
        [value]="value()"
        (input)="onInput($event)"
        [placeholder]="placeholder"
        rows="3"
        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-action-primary resize-none"
      ></textarea>

      @if (suggestions().length > 0) {
        <div
          class="absolute z-10 bottom-full mb-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
        >
          @for (user of suggestions(); track user.id) {
            <button
              type="button"
              (click)="selectUser(user)"
              class="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <span class="text-gray-400">&#64;</span>
              <span class="font-medium text-gray-900">{{ user.username }}</span>
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class MentionInputComponent implements OnDestroy {
  private readonly userSearchService = inject(UserSearchService);
  private readonly destroy$ = new Subject<void>();
  private readonly searchTrigger$ = new Subject<string>();

  @ViewChild("textarea")
  private readonly textareaRef!: ElementRef<HTMLTextAreaElement>;

  /** Placeholder text shown when the textarea is empty. */
  @Input() placeholder = "Write something... Use @ to mention users";
  /** Emitted whenever the text value changes. */
  @Output() valueChange = new EventEmitter<string>();

  protected readonly value = signal("");
  protected readonly suggestions = signal<IUser[]>([]);

  private currentMentionStart = -1;

  constructor() {
    this.searchTrigger$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.userSearchService.searchUsers(query)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (users) => this.suggestions.set(users),
        error: () => this.suggestions.set([]),
      });
  }

  /** Detects @mention trigger and fires user search. Updates value signal. */
  protected onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    const text = target.value;
    this.value.set(text);
    this.valueChange.emit(text);

    const cursorPos = target.selectionStart ?? text.length;
    const textBeforeCursor = text.substring(0, cursorPos);
    const mentionMatch = /@(\w*)$/.exec(textBeforeCursor);

    if (mentionMatch) {
      this.currentMentionStart = mentionMatch.index;
      this.searchTrigger$.next(mentionMatch[1]);
    } else {
      this.currentMentionStart = -1;
      this.suggestions.set([]);
    }
  }

  /** Replaces the partial @mention in the textarea with the selected username. */
  protected selectUser(user: IUser): void {
    const currentValue = this.value();
    const before = currentValue.substring(0, this.currentMentionStart);
    const afterCursor = currentValue.substring(this.currentMentionStart);
    const afterMention = afterCursor.replace(/^@\w*/, "");
    const newValue = `${before}@${user.username} ${afterMention}`;

    this.value.set(newValue);
    this.valueChange.emit(newValue);
    this.suggestions.set([]);
    this.currentMentionStart = -1;
  }

  /** Returns the current text value. */
  getValue(): string {
    return this.value();
  }

  /** Resets the textarea to empty. */
  reset(): void {
    this.value.set("");
    this.suggestions.set([]);
    this.currentMentionStart = -1;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
