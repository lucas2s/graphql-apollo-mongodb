import { PrismaClient } from '../../prisma/generated';

export class ConnectDatabaseMongoDB {
	private static connection: PrismaClient;

	constructor() {
		ConnectDatabaseMongoDB.connection = new PrismaClient();
	}

	getInstance(): PrismaClient {
		return ConnectDatabaseMongoDB.connection;
	}
}
