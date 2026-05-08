import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Converts article body text to rendered HTML.
 * Supports:
 *   ![caption](url)  → <figure><img ...><figcaption></figcaption></figure>
 *   **text**         → <strong>text</strong>
 *   Double newlines  → paragraph breaks
 */
@Pipe({ name: 'articleBody', standalone: true })
export class ArticleBodyPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(body: string | null | undefined): SafeHtml {
    if (!body) return '';

    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let html = '';
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = imageRegex.exec(body)) !== null) {
      html += this.textToHtml(body.slice(lastIndex, match.index));
      const alt = this.escapeHtml(match[1]);
      const url = this.escapeAttr(match[2]);
      html += `<figure class="my-8">` +
        `<img src="${url}" alt="${alt}" ` +
        `class="rounded-xl w-full object-cover shadow-md max-h-[480px]" ` +
        `loading="lazy" onerror="this.parentElement.style.display='none'"/>` +
        `<figcaption class="text-center text-sm text-gray-400 mt-2 italic">${alt}</figcaption>` +
        `</figure>`;
      lastIndex = match.index + match[0].length;
    }

    html += this.textToHtml(body.slice(lastIndex));
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private textToHtml(text: string): string {
    if (!text.trim()) return '';
    return text
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => {
        const escaped = this.escapeHtml(p)
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
          .replace(/\n/g, '<br>');
        return `<p class="mb-5">${escaped}</p>`;
      })
      .join('');
  }

  private escapeHtml(s: string): string {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  private escapeAttr(s: string): string {
    return s.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
}
