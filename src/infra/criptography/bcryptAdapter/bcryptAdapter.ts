import bcrypt from 'bcrypt'

import { Hasher, HashComparer } from '@data/protocols/criptography'

export class BcryptAdapter implements Hasher, HashComparer {
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 12)
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash)
  }
}
