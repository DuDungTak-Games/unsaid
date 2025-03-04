import PocketBase from 'pocketbase';

const dbUrl = import.meta.env.VITE_DB_URL;

if (!dbUrl) {
    throw new Error('VITE_DB_URL is not defined in the environment variables');
}

const client = new PocketBase(dbUrl);

export default client;