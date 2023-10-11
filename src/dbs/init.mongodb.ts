import mongoose from 'mongoose';
import { countConnect } from '../helpers/checkConnect';
import config from '../configs/app.config';

const connectionString = config.mongo.url;

class Database {
  static instance: any;

  constructor() {
    this.connect();
  }

  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }
    mongoose
      .connect(connectionString, { 
        maxPoolSize: 50 
      })
      .then(() => {
        console.log(`Connected Mongodb Success PRO`);
        countConnect()
      })
      .catch((err) => console.log(`Error Connect::${err}`));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceDatabase = Database.getInstance();

export default instanceDatabase;
