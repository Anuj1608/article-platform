import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IArticle, IArticleListItem, IReactionResult } from '@/app/shared/models/article.model';
import { ApiSuccessResponseType, PaginatedResultType } from '@/app/shared/models/api.model';
import { environment } from '@/environments/environment';

/** Service for article CRUD operations and reactions. */
@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly baseUrl = `${environment.apiUrl}/articles`;

  constructor(private readonly http: HttpClient) {}

  /** Returns a paginated list of articles sorted by newest first. */
  getArticles(page: number, size: number): Observable<PaginatedResultType<IArticleListItem>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http
      .get<ApiSuccessResponseType<PaginatedResultType<IArticleListItem>>>(this.baseUrl, { params })
      .pipe(map((r) => r.data));
  }

  /** Searches articles by title and body content. */
  searchArticles(query: string, page: number, size: number): Observable<PaginatedResultType<IArticleListItem>> {
    const params = new HttpParams().set('q', query).set('page', page).set('size', size);
    return this.http
      .get<ApiSuccessResponseType<PaginatedResultType<IArticleListItem>>>(`${this.baseUrl}/search`, { params })
      .pipe(map((r) => r.data));
  }

  /** Returns the full article detail including reaction counts. */
  getArticle(id: number): Observable<IArticle> {
    return this.http
      .get<ApiSuccessResponseType<IArticle>>(`${this.baseUrl}/${id}`)
      .pipe(map((r) => r.data));
  }

  /** Creates a new article. Requires authentication. */
  createArticle(title: string, body: string, coverImageUrl?: string): Observable<IArticle> {
    return this.http
      .post<ApiSuccessResponseType<IArticle>>(this.baseUrl, { title, body, coverImageUrl: coverImageUrl || null })
      .pipe(map((r) => r.data));
  }

  /** Reacts to an article with like or dislike. Toggling the same reaction removes it. */
  react(id: number, type: 'like' | 'dislike'): Observable<IReactionResult> {
    return this.http
      .post<ApiSuccessResponseType<IReactionResult>>(`${this.baseUrl}/${id}/${type}`, {})
      .pipe(map((r) => r.data));
  }
}
