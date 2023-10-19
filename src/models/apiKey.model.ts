import { Schema, model, Types } from 'mongoose';

const COLLECTION_NAME = 'ApiKeys';
const DOCUMENT_NAME = 'ApiKey';

const apiKeySchema = new Schema(
  {
    key: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      require: true,
      enum: ['0000', '1111', '2222'],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export default model(DOCUMENT_NAME, apiKeySchema);
