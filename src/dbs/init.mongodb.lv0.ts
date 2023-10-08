import mongoose from 'mongoose';

const connectionString = `mongodb://localhost:27017/shopDev?directConnection=true&authSource=admin`;

mongoose
  .connect(connectionString)
  .then(() => console.log(`Connected Mongodb Success`))
  .catch((err) => console.log(`Error Connect::${err}`));

export default mongoose;