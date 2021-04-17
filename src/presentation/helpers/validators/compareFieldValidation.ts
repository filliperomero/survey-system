import { InvalidParamError } from '@presentation/errors'
import { Validation } from './validation'

export class CompareFieldValidation implements Validation {
  constructor(private fieldName: string, private fieldToCompareName: string) {}

  validate(data: any): Error {
    if (data[this.fieldName] !== data[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}
