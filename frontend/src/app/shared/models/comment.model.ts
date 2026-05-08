import { IUser } from '@/app/shared/models/user.model';
import { ReactionType } from '@/app/shared/models/article.model';

/** A comment with its nested replies and reaction data. */
export interface IComment {
  id: number;
  body: string;
  author: IUser;
  createdAt: string;
  likeCount: number;
  dislikeCount: number;
  userReaction: ReactionType;
  replies: IComment[];
}
