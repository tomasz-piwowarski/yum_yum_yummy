import knex from "knex";
import { PG } from "./config";

export default knex({
	client: "pg",
	connection: {
		host: PG.HOST,
		port: PG.PORT,
		user: PG.USER,
		password: PG.PASSWORD,
		database: PG.DATABASE,
	},
});
