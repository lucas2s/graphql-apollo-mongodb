import { Post } from '../entities/Post';

export interface IPostRepository {
  createPost(post: Post): Promise<Post>;
  findPostById(id: string): Promise<Post | null>;
  findPosts(post: Post): Promise<Post[]>;
  updatePost(post: Post): Promise<Post>;
  deletePost(id: string): Promise<boolean>;
}