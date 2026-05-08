import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { MentionInputComponent } from "@/app/features/comments/mention-input/mention-input.component";

/**
 * Dumb form component for writing a comment or reply.
 * Delegates text input to MentionInputComponent and emits the body text on submit.
 */
@Component({
  selector: "app-comment-form",
  standalone: true,
  imports: [MentionInputComponent],
  template: `
    <form (submit)="onSubmit($event)" class="space-y-2">
      <app-mention-input
        #mentionInput
        [placeholder]="placeholder"
        (valueChange)="currentBody = $event"
      />
      <div class="flex justify-end">
        <button
          type="submit"
          [disabled]="!currentBody.trim()"
          class="px-4 py-1.5 bg-action-primary text-white text-sm font-medium rounded-lg hover:opacity-90 disabled:opacity-40 transition-opacity"
        >
          Post
        </button>
      </div>
    </form>
  `,
})
export class CommentFormComponent {
  @ViewChild("mentionInput")
  private readonly mentionInput!: MentionInputComponent;

  /** Placeholder text for the textarea. */
  @Input() placeholder = "Write a comment...";
  /** Emitted with the body text when the form is submitted. */
  @Output() submitted = new EventEmitter<string>();

  protected currentBody = "";

  /** Emits the body text and resets the form. */
  protected onSubmit(event: Event): void {
    event.preventDefault();
    const body = this.currentBody.trim();
    if (!body) return;
    this.submitted.emit(body);
    this.currentBody = "";
    this.mentionInput.reset();
  }
}
