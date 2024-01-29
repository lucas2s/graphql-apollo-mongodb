import { ConnectDatabaseMongoDB } from "./infra/database/ConnectDatabaseMongoDB";
import { ApolloServerStarter } from "./infra/graphql/ApolloServerStarter";
import { resolvers } from "./infra/graphql/resolvers";
import { typeDefs } from "./infra/graphql/typeDefs";

const connect_database_mongodb = new ConnectDatabaseMongoDB();
const connection = connect_database_mongodb.getInstance();
const server = new ApolloServerStarter({ typeDefs, resolvers });
server.start();