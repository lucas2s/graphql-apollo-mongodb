import { PrismaClient } from "../../../../prisma/generated";
import { IUserRepository } from "../../../domain/data/IUserRepository";
import { User } from "../../../domain/entities/User";

export class UserRepositoryPrisma implements IUserRepository {
  
  constructor(private readonly connect: PrismaClient) {}
  async deleteUserById(id: string): Promise<boolean> {
    try {
      await this.connect.user.delete({
        where: {
          id: id
        }
      });
      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      const userCreated = await this.connect.user.create({
        data: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          active: user.active
        }
      });
      return new User(
        userCreated.id,
        userCreated.first_name,
        userCreated.last_name,
        userCreated.email,
        userCreated.active,
        userCreated.created_at,
        userCreated.updated_at
      );
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findUserById(id: string): Promise<User | null> {
    try {
      const user = await this.connect.user.findUnique({
        where: {
          id: id
        }
      });
      if (!user) {
        return null;
      }
      return new User(
        user.id,
        user.first_name,
        user.last_name,
        user.email,
        user.active,
        user.created_at,
        user.updated_at
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findUsers(user?: User): Promise<User[]> {
    const where = {};
    if (user?.first_name) {
      Object.assign(where, { first_name: user.first_name });
    }
    if (user?.last_name) {
      Object.assign(where, { last_name: user.last_name });
    }
    if (user?.email) {
      Object.assign(where, { email: user.email });
    }
    if (user?.active) {
      Object.assign(where, { active: user.active });
    }
    try {
      const users = await this.connect.user.findMany({
        where: where
      });
      return users.map(user => {
        return new User(
          user.id,
          user.first_name,
          user.last_name,
          user.email,
          user.active,
          user.created_at,
          user.updated_at
        );
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
  
  async updateUser(user: User): Promise<User> {
    if (!user.id) {
      throw new Error("User id is required");
    }
    try {
      const userUpdated = await this.connect.user.update({
        where: {
          id: user.id
        },
        data: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          active: user.active
        }
      });
      return new User(
        userUpdated.id,
        userUpdated.first_name,
        userUpdated.last_name,
        userUpdated.email,
        userUpdated.active,
        userUpdated.created_at,
        userUpdated.updated_at
      );
    } catch (error: any) {
      throw new Error(error);
    }
  } 
}