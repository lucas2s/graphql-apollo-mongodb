import { PrismaClient } from '../../../prisma/generated';

export class ConnectDatabaseMongoDB {
	private static connection: PrismaClient;

	constructor(url_connection?:string) {
		try {
			let datasources = {};
			if (url_connection) {
				datasources = { db: { url: url_connection } };
			}
			if (!ConnectDatabaseMongoDB.connection) {
				ConnectDatabaseMongoDB.connection = new PrismaClient(datasources);
			}
		}
		catch (error: any) {
			throw new Error(error);
		}
	}

	getInstance(): PrismaClient {
		return ConnectDatabaseMongoDB.connection;
	}
}
