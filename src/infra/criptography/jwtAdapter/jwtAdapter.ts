import jwt from 'jsonwebtoken'

import { Encrypter } from '@data/protocols/criptography'

export class JwtAdapter implements Encrypter {
  constructor(private secret: string) {}

  async encrypt(value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret)
    return accessToken
  }
}
