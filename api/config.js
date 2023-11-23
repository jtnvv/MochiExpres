import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT || 8800;

export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "12345";
export const DB_NAME = process.env.DB_NAME || "mochiexpres";
export const DB_PORT = process.env.DB_PORT || 3306;


// export const DB_HOST = process.env.DB_HOST || "containers-us-west-88.railway.app";
// export const DB_USER = process.env.DB_USER || "root";
// export const DB_PASSWORD = process.env.DB_PASSWORD || "hZIwAkh9TLVIdyK6IsE8";
// export const DB_NAME = process.env.DB_NAME || "railway";
// export const DB_PORT = process.env.DB_PORT || 6246;

// export const DB_HOST = process.env.DB_HOST || "bhntkh5hnfdvcubwd7tc-mysql.services.clever-cloud.com";
// export const DB_USER = process.env.DB_USER || "ud5wyjvotay7zszu";
// export const DB_PASSWORD = process.env.DB_PASSWORD || "XQAc8LsOZjd0GltnKV4S";
// export const DB_NAME = process.env.DB_NAME || "bhntkh5hnfdvcubwd7tc";
// export const DB_PORT = process.env.DB_PORT || 3306;