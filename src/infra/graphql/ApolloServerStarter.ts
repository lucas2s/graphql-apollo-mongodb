import { ApolloServer } from 'apollo-server';

export class ApolloServerStarter {

  private server: ApolloServer;

  constructor({ typeDefs, resolvers }: any) {
    this.server = new ApolloServer({ typeDefs, resolvers });
  }

  public start() {
    this.server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  }
}