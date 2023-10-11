require('dotenv').config({ path: process.env.NODE_ENV === 'dev' ? `.env.${process.env.NODE_ENV}` : `.env` });

const config = {
  currentEnv: {
    nodeEnv: process.env.NODE_ENV,
  },
  app: {
    port: process.env.PORT_APP,
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },

  mongo: {
    url: process.env.MONGODB_URL || '',
  },
};

export default config;
