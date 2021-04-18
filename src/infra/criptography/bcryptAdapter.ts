import bcrypt from 'bcrypt'

import { Encrypter } from '@data/protocols/criptography/encrypter'

export class BcryptAdapter implements Encrypter {
  async encrypt(value: string): Promise<string> {
    return bcrypt.hash(value, 12)
  }
}
