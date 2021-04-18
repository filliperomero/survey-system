import {
  Authentication,
  AuthenticationModel,
  HashComparer,
  LoadAccountByEmailRepository,
  Encrypter,
  UpdateAccessTokenRepository
} from './dbAuthenticationProtocols'

export class DbAuthentication implements Authentication {
  constructor(
    private loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
    private updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)

    if (!account) return null
    if (!(await this.hashComparer.compare(authentication.password, account.password))) return null

    const accessToken = await this.encrypter.encrypt(account.id)

    await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
    return accessToken
  }
}
