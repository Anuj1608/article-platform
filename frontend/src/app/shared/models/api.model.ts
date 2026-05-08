/** Standard success response envelope. */
export interface ApiSuccessResponseType<T> {
  success: true;
  data: T;
}

/** Standard error response envelope. */
export interface ApiErrorResponseType {
  success: false;
  error: string;
  errors?: Record<string, string>;
}

/** Spring Data Page metadata and content. */
export interface PaginatedResultType<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
