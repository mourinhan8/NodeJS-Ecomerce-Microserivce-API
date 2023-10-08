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
    url: process.env.MONGODB_URL,
    uri: process.env.MONGO_DB_URI,
  },

  telegram: {
    botToken: process.env.TELEGRAM_BOT_ID,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },

  queue: {
    sendEmail: process.env.SEND_EMAIL_QUEUE || 'streamingSendEmailQueue',
    sendTelegram: process.env.SEND_TELEGRAM_QUEUE || 'streamingSendTelegramQueue',
    messageSaving: process.env.MESSAGE_SAVING_QUEUE || 'streamingMessageSavingQueue',
  },

  aws: {
    bucket: process.env.AWS_BUCKET,
    region: process.env.AWS_REGION,
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
  },

  sendGrid: {
    apiKey: process.env.SENDGRID_API_KEY || 'key',
  },

  livekit: {
    apiKey: process.env.LIVEKIT_API_KEY,
    apiSecret: process.env.LIVEKIT_API_SECRET,
    apiUrl: process.env.LIVEKIT_API_URL,
    wsUrl: process.env.LIVEKIT_WS_URL,
  },

  stripe: {
    key: process.env.STRIPE_KEY,
  },
};

export default config;
