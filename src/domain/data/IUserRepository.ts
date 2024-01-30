import { User } from "../entities/User";

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  findUserById(id: string): Promise<User | null>;
  findUsers(user: User): Promise<User[]>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<boolean>;
}