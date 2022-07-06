import dotenv from 'dotenv';

['.env.local'].forEach((path) => {
  dotenv.config({ path });
});

const config = {
  port: Number(process.env.PORT),
  mongo: {
    host: String(process.env.MONGO_HOST),
    port: Number(process.env.MONGO_PORT),
    user: String(process.env.MONGO_USER),
    password: String(process.env.MONGO_PASSWORD),
    database: String(process.env.MONGO_DATABASE),
  },
};

export default config;
