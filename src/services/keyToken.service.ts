import { Types } from 'mongoose';
import keyTokenModel from '../models/keyToken.model';
export default class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
    // level 0
    // const tokens = await keyTokenModel.create({ user: userId, publicKey, privateKey });
    // return tokens ? { publicKey: tokens.publicKey, privateKey: tokens.privateKey } : null;

    // level xxx
    const filter = { user: userId },
      update = {
        publicKey,
        privateKey,
        refreshTokenUsed: [],
        refreshToken,
      },
      options = { upsert: true, new: true };
    const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options);
    return tokens ? { publicKey: tokens.publicKey, privateKey: tokens.privateKey } : null;
  };

  static findByUserId = async (userId) => {
    return await keyTokenModel.findOne({ user: new Types.ObjectId(userId) }).lean();
  };

  static removeKeyById = async (id) => {
    return await keyTokenModel.deleteOne({ _id: id });
  };

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await keyTokenModel.findOne({ refreshTokensUsed: refreshToken });
  };

  static deleteKeyById = async (userId) => {
    return await keyTokenModel.findByIdAndDelete({ user: userId });
  };
}
