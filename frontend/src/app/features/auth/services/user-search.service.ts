import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IUser } from "@/app/shared/models/user.model";
import { ApiSuccessResponseType } from "@/app/shared/models/api.model";
import { environment } from "@/environments/environment";

/** Service for searching users by username — used for @mention autocomplete. */
@Injectable({ providedIn: "root" })
export class UserSearchService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Searches users by username fragment (case-insensitive).
   */
  searchUsers(query: string): Observable<IUser[]> {
    const params = new HttpParams().set("q", query);
    return this.http
      .get<
        ApiSuccessResponseType<IUser[]>
      >(`${environment.apiUrl}/users/search`, { params })
      .pipe(map((r) => r.data));
  }
}
