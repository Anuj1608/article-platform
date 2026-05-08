import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Animated skeleton placeholder shown during data loading.
 * Pass CSS width classes for each row to control the loading layout.
 */
@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-7 h-7 bg-gray-200 rounded-full"></div>
        <div class="h-3 bg-gray-200 rounded w-24"></div>
        <div class="h-3 bg-gray-100 rounded w-16 ml-1"></div>
      </div>
      <div class="space-y-2.5">
        @for (row of rows; track $index) {
          <div class="h-4 bg-gray-200 rounded" [class]="row"></div>
        }
      </div>
      <div class="flex gap-3 mt-4">
        <div class="h-3 bg-gray-100 rounded w-10"></div>
        <div class="h-3 bg-gray-100 rounded w-10"></div>
        <div class="h-3 bg-gray-100 rounded w-10"></div>
      </div>
    </div>
  `,
})
export class SkeletonLoaderComponent {
  /** Tailwind width classes for each row, e.g. ['w-full', 'w-3/4', 'w-1/2']. */
  @Input() rows: string[] = ['w-full', 'w-full', 'w-3/4'];
}
