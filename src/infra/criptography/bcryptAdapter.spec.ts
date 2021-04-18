import bcrypt from 'bcrypt'

import { BcryptAdapter } from './bcryptAdapter'

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter()
}

describe('Bcrypt Adapter', () => {
  it('should be able to call bcrypt with valid value', async () => {
    const sut = makeSut()

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.hash('any value')

    expect(hashSpy).toHaveBeenCalledWith('any value', 12)
  })

  it('should be able to hash the value', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashed_value')

    const hashedValue = await sut.hash('any value')

    expect(hashedValue).toBe('hashed_value')
  })

  it('should be able to throw if bcrypt throws', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error())

    expect(() => sut.hash('any value')).rejects.toThrow()
  })
})
