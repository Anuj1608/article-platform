import { IUser } from '@/app/shared/models/user.model';

export type ReactionType = 'LIKE' | 'DISLIKE' | null;

/** Full article including body, reaction counts, and user reaction state. */
export interface IArticle {
  id: number;
  title: string;
  body: string;
  coverImageUrl: string | null;
  author: IUser;
  createdAt: string;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  userReaction: ReactionType;
}

/** Compact article for use in paginated list views. */
export interface IArticleListItem {
  id: number;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  author: IUser;
  createdAt: string;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  userReaction: ReactionType;
}

/** Result of a reaction (like/dislike) operation. */
export interface IReactionResult {
  likeCount: number;
  dislikeCount: number;
  userReaction: ReactionType;
}
