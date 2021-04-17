import { MissingParamError } from '@presentation/errors'
import { Validation } from '../../protocols'

export class RequiredFieldValidation implements Validation {
  constructor(private fieldName: string) {}

  validate(data: any): Error {
    if (!data[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
