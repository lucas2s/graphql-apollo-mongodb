import { PrismaClient } from '../../../prisma/generated';

export class ConnectDatabaseMongoDB {
	private static connection: PrismaClient;

	constructor(url_connection?:string) {
		let datasources = {};
		if (url_connection) {
			datasources = { db: { url: url_connection } };
		}
		if (!ConnectDatabaseMongoDB.connection) {
			ConnectDatabaseMongoDB.connection = new PrismaClient(datasources);
		}
	}

	getInstance(): PrismaClient {
		return ConnectDatabaseMongoDB.connection;
	}
}
