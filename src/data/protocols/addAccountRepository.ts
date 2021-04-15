import { AccountModel } from '../../domain/models/account'
import { AddAccountModel } from '../../domain/useCases/addAccount'

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel>
}
