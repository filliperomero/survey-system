import { AccountModel } from '@domain/models/account'
import { Hasher, AddAccountModel, AddAccountRepository } from './addAccountProtocols'
import { DbAddAccount } from './dbAddAccount'

interface SutTypes {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: accountData.name,
        email: accountData.email,
        password: accountData.password
      }
      return new Promise(resolve => resolve(fakeAccount))
    }
  }

  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }

  const hasherStub = new HasherStub()
  const addAccountRepositoryStub = new AddAccountRepositoryStub()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub)

  return {
    sut,
    hasherStub,
    addAccountRepositoryStub
  }
}

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'joe doe',
  email: 'joe.doe@mail.com',
  password: '123456'
})

describe('DbAddAccount Usecase', () => {
  it('should be able to encrypt the password', async () => {
    const { sut, hasherStub } = makeSut()

    const encryptSpy = jest.spyOn(hasherStub, 'hash')

    const accountData = makeFakeAccountData()

    sut.execute(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('123456')
  })

  it('should be able to throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()

    jest.spyOn(hasherStub, 'hash').mockRejectedValueOnce(new Error())

    const accountData = makeFakeAccountData()

    await expect(() => sut.execute(accountData)).rejects.toThrow()
  })

  it('should be able to add an account in the repository', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const accountData = makeFakeAccountData()

    await sut.execute(accountData)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'joe doe',
      email: 'joe.doe@mail.com',
      password: 'hashed_password'
    })
  })

  it('should be able to throw if repository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(new Error())

    const accountData = makeFakeAccountData()

    await expect(() => sut.execute(accountData)).rejects.toThrow()
  })

  it('should be able to add and receive an account', async () => {
    const { sut } = makeSut()

    const accountData = makeFakeAccountData()

    const account = await sut.execute(accountData)

    expect(account).toEqual({
      id: 'valid_id',
      name: 'joe doe',
      email: 'joe.doe@mail.com',
      password: 'hashed_password'
    })
  })
})
