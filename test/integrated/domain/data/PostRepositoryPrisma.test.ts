import { IPostRepository } from './../../../../src/domain/data/IPostRepository';
import { IUserRepository } from '../../../../src/domain/data/IUserRepository';
import { Post } from './../../../../src/domain/entities/Post';
import { User } from '../../../../src/domain/entities/User';
import { PostRepositoryPrisma } from './../../../../src/infra/database/repositories/PostRepositoryPrisma';
import { UserRepositoryPrisma } from '../../../../src/infra/database/repositories/UserRepositoryPrisma';
import { ConnectDatabaseMongoDB } from './../../../../src/infra/database/ConnectDatabaseMongoDB';
import { faker } from '@faker-js/faker';

describe('PostRepository', () => {
  let postRepository: IPostRepository;
  let userRepository: IUserRepository;
  let post_id = '';

  beforeAll(async () => {
    const connect_database_mongodb = new ConnectDatabaseMongoDB();
    const connection = connect_database_mongodb.getInstance();
    userRepository = new UserRepositoryPrisma(connection);
    postRepository = new PostRepositoryPrisma(connection, userRepository);
  });

  describe('Create Post', () => {
    it('Should save a new post', async () => {
      const user = new User(
        null,
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.email(),
        true
      );
      const result_create_user = await userRepository.createUser(user);
      const post = new Post(
        null,
        faker.lorem.sentence(),
        faker.lorem.paragraph(),
        result_create_user
      );
      const result_create_post = await postRepository.createPost(post);
      expect(result_create_post.title).toEqual(post.title);
      expect(result_create_post.content).toEqual(post.content);
      expect(result_create_post.author.id).toEqual(result_create_user.id);
      if (result_create_post.id) {
        post_id = result_create_post.id;
      }
    });
  });

  describe('Find Post By Id', () => {
    it('Should find a post by id', async () => {
      const result_find_post = await postRepository.findPostById(post_id);
      expect(result_find_post).not.toBeNull();
      expect(result_find_post?.id).toEqual(post_id);
    });
  });

  describe('Find Posts', () => {
    it('Should find any posts', async () => {
      const result_find_posts = await postRepository.findPosts();
      expect(result_find_posts).not.toBeNull();
      expect(result_find_posts.length).toBeGreaterThan(0);
    });
  });

  describe('Delete Post', () => {
    it('Should delete a post by id', async () => {
      const result_delete_post = await postRepository.deletePostById(post_id);
      expect(result_delete_post).toBeTruthy();
    });
  });
});