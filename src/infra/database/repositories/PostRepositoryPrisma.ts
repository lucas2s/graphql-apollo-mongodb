import { PrismaClient, Post as PostModel } from "../../../../prisma/generated";
import { IPostRepository } from "../../../domain/data/IPostRepository";
import { IUserRepository } from "../../../domain/data/IUserRepository";
import { Post } from "../../../domain/entities/Post";

export class PostRepositoryPrisma implements IPostRepository {
  
  constructor(
    private readonly connect: PrismaClient,
    private readonly UserRepository: IUserRepository
  ) {}

  async deletePostById(id: string): Promise<boolean> {
    try {
      await this.connect.post.delete({
        where: {
          id: id
        }
      });
      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createPost(post: Post): Promise<Post> {
    if (!post.author?.id) {
      throw new Error("Author id is required");
    }
    try {
      const postCreated = await this.connect.post.create({
        data: {
          title: post.title,
          content: post.content,
          authorId: post.author?.id
        }
      });
      return await this.buildPost(postCreated);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findPostById(id: string): Promise<Post | null> {
    try {
      const post = await this.connect.post.findUnique({
        where: {
          id: id
        }
      });
      if (!post) {
        return null;
      }
      return await this.buildPost(post);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findPosts(post?: Post): Promise<Post[]> {
    const where = {};
    if (post?.id) {
      Object.assign(where, { id: post.id });
    }
    if (post?.title) {
      Object.assign(where, { title: post.title });
    }
    if (post?.content) {
      Object.assign(where, { content: post.content });
    }
    if (post?.author?.id) {
      Object.assign(where, { authorId: post.author?.id });
    }
    try {
      const results = await this.connect.post.findMany({
        where: where
      }); 
      const posts = await Promise.all(
        results.map(async (post) => {
          return this.buildPost(post);
        })
      );
      return posts;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  
  async updatePost(post: Post): Promise<Post> {
    if (!post.id) {
      throw new Error("User id is required");
    }
    try {
      const postUpdated = await this.connect.post.update({
        where: {
          id: post.id
        },
        data: {
          title: post.title,
          content: post.content
        }
      });
      return await this.buildPost(postUpdated);
    } catch (error: any) {
      throw new Error(error);
    }
  } 

  async buildPost(postModel: PostModel): Promise<Post> {
    const author = await this.UserRepository.findUserById(postModel.authorId);
    if (!author) {
      throw new Error("Author not found");
    }
    return new Post(
      postModel.id,
      postModel.title,
      postModel.content,
      author,
      postModel.created_at,
      postModel.updated_at
    );
  }
}