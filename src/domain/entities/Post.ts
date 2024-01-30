import { User } from "./User";

export class Post {
  constructor(
    readonly id: string | null,
    readonly title: string,
    readonly content: string,
    readonly author: User,
    readonly created_at?: Date | null,
    readonly updated_at?: Date | null,
  ) {}
}