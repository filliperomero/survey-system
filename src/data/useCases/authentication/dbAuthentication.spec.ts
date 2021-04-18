import { DbAuthentication } from './dbAuthentication'
import {
  AccountModel,
  HashComparer,
  LoadAccountByEmailRepository,
  Encrypter,
  UpdateAccessTokenRepository
} from './dbAuthenticationProtocols'

const makeFakeAccount = (): AccountModel => ({
  id: 'any id',
  name: 'Joe Doe',
  email: 'joe.doe@mail.com',
  password: 'hashed_password'
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load(email: string): Promise<AccountModel> {
      return Promise.resolve(makeFakeAccount())
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

const makeHashComprarer = (): HashComparer => {
  class HashComprarerStub implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }

  return new HashComprarerStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return Promise.resolve('any token')
    }
  }

  return new EncrypterStub()
}

const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async update(id: string, token: string): Promise<void> {
      return Promise.resolve()
    }
  }

  return new UpdateAccessTokenRepositoryStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComprarerStub: HashComparer
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const hashComprarerStub = makeHashComprarer()
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const encrypterStub = makeEncrypter()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComprarerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  )

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComprarerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

const makeFakeAuthentication = () => ({
  email: 'joe.doe@mail.com',
  password: 'password'
})

describe('DbAuthentication UseCase', () => {
  it('should be able to call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')

    const account = makeFakeAuthentication()
    await sut.auth(account)

    expect(loadSpy).toHaveBeenLastCalledWith(account.email)
  })

  it('should be able to throw when LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockRejectedValue(new Error())

    await expect(() => sut.auth(makeFakeAuthentication())).rejects.toThrow()
  })

  it('should be able to return null when LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockResolvedValue(null)

    const accessToken = await sut.auth(makeFakeAuthentication())

    expect(accessToken).toBeNull()
  })

  it('should be able to call HashComparer with correct password', async () => {
    const account = makeFakeAuthentication()
    const { sut, hashComprarerStub } = makeSut()

    const compareSpy = jest.spyOn(hashComprarerStub, 'compare')

    await sut.auth(account)

    expect(compareSpy).toHaveBeenLastCalledWith(account.password, 'hashed_password')
  })

  it('should be able to throw when HashComparer throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()

    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockRejectedValue(new Error())

    await expect(() => sut.auth(makeFakeAuthentication())).rejects.toThrow()
  })

  it('should be able to return null when HashComparer returns false', async () => {
    const { sut, hashComprarerStub } = makeSut()

    jest.spyOn(hashComprarerStub, 'compare').mockResolvedValueOnce(false)

    const accessToken = await sut.auth(makeFakeAuthentication())

    expect(accessToken).toBeNull()
  })

  it('should be able to call Encrypter with correct id', async () => {
    const account = makeFakeAuthentication()
    const { sut, encrypterStub } = makeSut()

    const generateSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.auth(account)

    expect(generateSpy).toHaveBeenLastCalledWith('any id')
  })

  it('should be able to throw when Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()

    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValue(new Error())

    await expect(() => sut.auth(makeFakeAuthentication())).rejects.toThrow()
  })

  it('should be able to call Encrypter with correct id', async () => {
    const account = makeFakeAuthentication()
    const { sut } = makeSut()

    const accessToken = await sut.auth(account)

    expect(accessToken).toBe('any token')
  })

  it('should be able to call UpdateAccessTokenRepository with correct value', async () => {
    const account = makeFakeAuthentication()
    const { sut, updateAccessTokenRepositoryStub } = makeSut()

    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'update')

    await sut.auth(account)

    expect(updateSpy).toHaveBeenLastCalledWith('any id', 'any token')
  })

  it('should be able to throw when UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()

    jest.spyOn(updateAccessTokenRepositoryStub, 'update').mockRejectedValue(new Error())

    await expect(() => sut.auth(makeFakeAuthentication())).rejects.toThrow()
  })
})
