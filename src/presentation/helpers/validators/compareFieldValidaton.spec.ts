import { InvalidParamError } from '@presentation/errors'
import { CompareFieldValidation } from './compareFieldValidation'

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation('field', 'fieldToCompare')
}

describe('CompareField Validation', () => {
  it('should be able to return an InvalidParamError if validation fails', () => {
    const sut = makeSut()

    expect(sut.validate({ field: 'any value', fieldToCompare: 'any other value' })).toEqual(
      new InvalidParamError('fieldToCompare')
    )
  })

  it('should be able to return nothing if validation succeeds', () => {
    const sut = makeSut()

    expect(sut.validate({ field: 'any value', fieldToCompare: 'any value' })).toBeFalsy()
  })
})
