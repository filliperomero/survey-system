import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcryptAdapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hashed value')
  },
  async compare(): Promise<boolean> {
    return Promise.resolve(true)
  }
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter()
}

describe('Bcrypt Adapter', () => {
  it('should be able to call hash with valid value', async () => {
    const sut = makeSut()

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.hash('any value')

    expect(hashSpy).toHaveBeenCalledWith('any value', 12)
  })

  it('should be able to hash the value', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashed value')

    const hashedValue = await sut.hash('any value')

    expect(hashedValue).toBe('hashed value')
  })

  it('should be able to throw if hash throws', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error())

    expect(() => sut.hash('any value')).rejects.toThrow()
  })

  it('should be able to call compare with valid value', async () => {
    const sut = makeSut()

    const compaseSpy = jest.spyOn(bcrypt, 'compare')

    await sut.compare('any value', 'any hash')

    expect(compaseSpy).toHaveBeenCalledWith('any value', 'any hash')
  })

  it('should be able to return true when compare succeeds', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'hash')

    const isValid = await sut.compare('any value', 'any hash')

    expect(isValid).toBeTruthy()
  })

  it('should be able to return false when compare fails', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false)

    const isValid = await sut.compare('any value', 'any hash')

    expect(isValid).toBeFalsy()
  })

  it('should be able to throw if compare throws', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'compare').mockRejectedValueOnce(new Error())

    expect(() => sut.compare('any value', 'any hash')).rejects.toThrow()
  })
})
