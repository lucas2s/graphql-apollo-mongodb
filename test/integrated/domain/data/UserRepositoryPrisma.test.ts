import { IUserRepository } from './../../../../src/domain/data/IUserRepository';
import { User } from './../../../../src/domain/entities/User';
import { UserRepositoryPrisma } from './../../../../src/infra/database/repositories/UserRepositoryPrisma';
import { ConnectDatabaseMongoDB } from './../../../../src/infra/database/ConnectDatabaseMongoDB';
import { faker } from '@faker-js/faker';


describe('UserRepository', () => {
  let userRepository: IUserRepository;
  let user_id = '';

  beforeAll(async () => {
    const connect_database_mongodb = new ConnectDatabaseMongoDB();
    const connection = connect_database_mongodb.getInstance();
    userRepository = new UserRepositoryPrisma(connection);
  });

  describe('Create User', () => {
    it('Should save a new user', async () => {
      const user = new User(
        null,
        faker.person.firstName(),
        faker.person.lastName(),
        faker.internet.email(),
        true
      );
      const result_create_user = await userRepository.createUser(user);
      expect(result_create_user.first_name).toEqual(user.first_name);
      expect(result_create_user.last_name).toEqual(user.last_name);
      expect(result_create_user.email).toEqual(user.email);
      if (result_create_user.id) {
        user_id = result_create_user.id;
      }
    });
  });

  describe('Find User By Id', () => {
    it('Should find a user by id', async () => {
      const result_find_user = await userRepository.findUserById(user_id);
      expect(result_find_user).not.toBeNull();
      expect(result_find_user?.id).toEqual(user_id);
    });
  });

  describe('Find Users', () => {
    it('Should find any users', async () => {
      const result_find_users = await userRepository.findUsers();
      expect(result_find_users).not.toBeNull();
      expect(result_find_users.length).toBeGreaterThan(0);
    });
  });

  describe('Delete User', () => {
    it('Should delete a user by id', async () => {
      const result_delete_user = await userRepository.deleteUserById(user_id);
      expect(result_delete_user).toBeTruthy();
    });
  });
});