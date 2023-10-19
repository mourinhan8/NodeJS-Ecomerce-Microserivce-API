import keyTokenModel from '../models/keyToken.model';

export default class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const tokens = await keyTokenModel.create({ user: userId, publicKey, privateKey });
      return tokens ? { publicKey: tokens.publicKey, privateKey: tokens.privateKey } : null;
    } catch (error) {
      return error;
    }
  };
}
