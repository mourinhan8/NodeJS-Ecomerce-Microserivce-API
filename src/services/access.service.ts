import bcrypt from 'bcryptjs';
import shopModel from '../models/shop.model';
import crypto from 'node:crypto';
import KeyTokenService from './keyToken.service';
import { createTokenPair } from '../auth/authUtils';
import { getIntoData } from '../utils';
import { BadRequestError } from '../core/error.response';

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
};

class AccessService {
  static signUp = async ({ name, email, password }: any) => {
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      throw new BadRequestError('Error: Shop already registered');
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newShop = await shopModel.create({ name, email, password: passwordHash, roles: [RoleShop.SHOP] });
    if (newShop) {
      // create privateKey, publicKey
      const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'pkcs1',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs1',
          format: 'pem',
        },
      });

      const keyPair = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      });

      if (!keyPair) {
        return {
          code: 'xxx',
          message: 'publicKeyString error',
        };
      }

      const publicKeyObject = crypto.createPublicKey(keyPair.publicKey);
      const privateKeyObject = crypto.createPrivateKey(keyPair.privateKey);

      // create token pair
      const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyObject, privateKeyObject);

      return {
        code: 201,
        metadata: {
          shop: getIntoData({ fields: ['_id', 'name', 'email'], object: newShop }),
          tokens,
        },
      };
    }

    return {
      code: 200,
      metadata: null,
    };
  };
}

export default AccessService;
