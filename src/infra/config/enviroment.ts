import dotenv from 'dotenv';

if (dotenv) {
	dotenv.config();
}

const ENV = process.env.ENV || 'development';
const DATABASE_URL_MONGODB = process.env.DATABASE_URL_MONGODB || "";

export {
	ENV,
	DATABASE_URL_MONGODB
};
