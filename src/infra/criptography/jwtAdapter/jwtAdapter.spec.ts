import jwt from 'jsonwebtoken'

import { JwtAdapter } from './jwtAdapter'

jest.mock('jsonwebtoken', () => ({
  sign: async (): Promise<string> => {
    return Promise.resolve('any token')
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('JWT Adapter', () => {
  it('should be able to call sign with correct values', async () => {
    const sut = makeSut()

    const signSpy = jest.spyOn(jwt, 'sign')

    await sut.encrypt('any id')

    expect(signSpy).toHaveBeenCalledWith({ id: 'any id' }, 'secret')
  })

  it('should be able to return a token', async () => {
    const sut = makeSut()

    const accessToken = await sut.encrypt('any id')

    expect(accessToken).toBe('any token')
  })

  it('should be able to throw when sign throws', async () => {
    const sut = makeSut()

    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })

    expect(() => sut.encrypt('any id')).rejects.toThrow()
  })
})
