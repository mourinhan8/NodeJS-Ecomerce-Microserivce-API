import bcrypt from 'bcryptjs';
import shopModel from '../models/shop.model';
import crypto from 'node:crypto';
import KeyTokenService from './keyToken.service';
import { createTokenPair, verifyJWT } from '../auth/authUtils';
import { getIntoData } from '../utils';
import { AuthFailureError, BadRequestError } from '../core/error.response';
import { findByEmail } from './shop.service';

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
};

class AccessService {
  static handlerRefreshToken = async (refreshToken) => {
    const foundToken = await KeyTokenService.findByRefreshTokenUsed(refreshToken);
    if (foundToken) {
      // decode xem may la thang nao?
      const decoded = verifyJWT(refreshToken, foundToken.privateKey);
      console.log(decoded);
      // xoa
    }
  };

  static logout = async ({ keyStore }) => {
    const delKey = await KeyTokenService.removeKeyById(keyStore._id);
    console.log({ delKey });
    return delKey;
  };

  static login = async ({ email, password, refreshToken }) => {
    const foundShop = await findByEmail({ email });
    if (!foundShop) {
      throw new BadRequestError('Shop not registered');
    }

    const matchPassword = await bcrypt.compare(password, foundShop.password);

    if (!matchPassword) {
      throw new AuthFailureError('Authentication error');
    }

    const privateKey = crypto.randomBytes(64).toString('hex');
    const publicKey = crypto.randomBytes(64).toString('hex');
    const tokens = await createTokenPair({ userId: foundShop._id, email }, publicKey, privateKey);

    const keyStore = await KeyTokenService.createKeyToken({
      refreshToken: tokens.refreshToken,
      userId: foundShop._id,
      publicKey,
      privateKey,
    });

    if (!keyStore) {
      throw new BadRequestError('Store key error');
    }

    return {
      shop: getIntoData({ fields: ['_id', 'name', 'email'], object: foundShop }),
      tokens,
    };
  };

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
      // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      //   modulusLength: 4096,
      //   publicKeyEncoding: {
      //     type: 'pkcs1',
      //     format: 'pem',
      //   },
      //   privateKeyEncoding: {
      //     type: 'pkcs1',
      //     format: 'pem',
      //   },
      // });

      const privateKey = crypto.randomBytes(64).toString('hex');
      const publicKey = crypto.randomBytes(64).toString('hex');

      // const publicKeyObject = crypto.createPublicKey(keyStore.publicKey);
      // const privateKeyObject = crypto.createPrivateKey(keyStore.privateKey);

      const publicKeyObject = publicKey;
      const privateKeyObject = privateKey;
      // create token pair
      const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyObject, privateKeyObject);

      console.log(tokens);

      const keyStore = await KeyTokenService.createKeyToken({
        refreshToken: tokens.refreshToken,
        userId: newShop._id,
        publicKey,
        privateKey,
      });

      if (!keyStore) {
        throw new BadRequestError('Store key error');
      }

      return {
        shop: getIntoData({ fields: ['_id', 'name', 'email'], object: newShop }),
        tokens,
      };
    }

    return null;
  };
}

export default AccessService;
