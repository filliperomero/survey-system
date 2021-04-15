import { AccountModel } from '../../../domain/models/account'
import { Encrypter, AddAccountModel, AddAccountRepository } from './addAccountProtocols'
import { DbAddAccount } from './dbAddAccount'

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
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

  class EncrypterStub {
    async encrypt(value: string): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }

  const encrypterStub = new EncrypterStub()
  const addAccountRepositoryStub = new AddAccountRepositoryStub()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  it('should be able to encrypt the password', async () => {
    const { sut, encrypterStub } = makeSut()

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const accountData = {
      name: 'joe doe',
      email: 'joe.doe@mail.com',
      password: '123456'
    }

    sut.execute(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('123456')
  })

  it('should be able to throw if encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()

    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error())

    const accountData = {
      name: 'joe doe',
      email: 'joe.doe@mail.com',
      password: '123456'
    }

    await expect(() => sut.execute(accountData)).rejects.toThrow()
  })

  it('should be able to add an account in the repository', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const accountData = {
      name: 'joe doe',
      email: 'joe.doe@mail.com',
      password: '123456'
    }

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

    const accountData = {
      name: 'joe doe',
      email: 'joe.doe@mail.com',
      password: '123456'
    }

    await expect(() => sut.execute(accountData)).rejects.toThrow()
  })

  it('should be able to add and receive an account', async () => {
    const { sut } = makeSut()

    const accountData = {
      name: 'joe doe',
      email: 'joe.doe@mail.com',
      password: '123456'
    }

    const account = await sut.execute(accountData)

    expect(account).toEqual({
      id: 'valid_id',
      name: 'joe doe',
      email: 'joe.doe@mail.com',
      password: 'hashed_password'
    })
  })
})
