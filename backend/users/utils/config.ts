require("dotenv").config();

export const PORT = process.env.PORT as string;
export const PG = {
	HOST: process.env.PG_HOST as string,
	PORT: Number(process.env.PG_PORT as string),
	USER: process.env.PG_USER as string,
	PASSWORD: process.env.PG_PASSWORD as string,
	DATABASE: process.env.PG_DATABASE as string,
};
