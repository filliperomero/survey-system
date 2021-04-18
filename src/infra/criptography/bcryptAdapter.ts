import bcrypt from 'bcrypt'

import { Hasher } from '@data/protocols/criptography/hasher'

export class BcryptAdapter implements Hasher {
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 12)
  }
}
