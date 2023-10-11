import bcrypt from 'bcryptjs';
import shopModel from '../models/shop.model';

class AccessService {
  static signUp = async ({ name, email, password }: any) => {
    try {
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        return {
          code: 'xxxx',
          message: 'Shop already registered',
        };
      }
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const roles = ['shop'];
      const newShop = await shopModel.create({ name, email, password: passwordHash, roles });
      return newShop;
    } catch (error: any) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error',
      };
    }
  };
}

export default AccessService;
