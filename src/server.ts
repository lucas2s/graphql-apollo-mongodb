import { ConnectDatabaseMongoDB } from './database/ConnectDatabaseMongoDB';
import { ApolloServerStarter } from './ApolloServerStarter';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

const connect_database_mongodb = new ConnectDatabaseMongoDB();
const connection = connect_database_mongodb.getInstance();
const server = new ApolloServerStarter({ typeDefs, resolvers });
server.start();