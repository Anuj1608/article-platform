import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IComment } from '@/app/shared/models/comment.model';
import { IReactionResult } from '@/app/shared/models/article.model';
import { ApiSuccessResponseType } from '@/app/shared/models/api.model';
import { environment } from '@/environments/environment';

/** Service for comment retrieval, creation, and reactions. */
@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(private readonly http: HttpClient) {}

  /** Returns the threaded comment tree for an article. */
  getComments(articleId: number): Observable<IComment[]> {
    return this.http
      .get<ApiSuccessResponseType<IComment[]>>(
        `${environment.apiUrl}/articles/${articleId}/comments`,
      )
      .pipe(map((r) => r.data));
  }

  /** Adds a root comment to an article. */
  addComment(articleId: number, body: string): Observable<IComment> {
    return this.http
      .post<ApiSuccessResponseType<IComment>>(
        `${environment.apiUrl}/articles/${articleId}/comments`,
        { body },
      )
      .pipe(map((r) => r.data));
  }

  /** Adds a reply to an existing comment. */
  addReply(parentCommentId: number, body: string): Observable<IComment> {
    return this.http
      .post<ApiSuccessResponseType<IComment>>(
        `${environment.apiUrl}/comments/${parentCommentId}/replies`,
        { body },
      )
      .pipe(map((r) => r.data));
  }

  /** Reacts to a comment with like or dislike. Toggling the same reaction removes it. */
  react(commentId: number, type: 'like' | 'dislike'): Observable<IReactionResult> {
    return this.http
      .post<ApiSuccessResponseType<IReactionResult>>(
        `${environment.apiUrl}/comments/${commentId}/${type}`,
        {},
      )
      .pipe(map((r) => r.data));
  }
}
