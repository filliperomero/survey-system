import { MissingParamError } from '@presentation/errors'
import { RequiredFieldValidation } from './requiredFieldValidation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('RequiredField Validation', () => {
  it('should be able to return an MissingParamError if validation fails', () => {
    const sut = makeSut()

    expect(sut.validate({})).toEqual(new MissingParamError('field'))
  })

  it('should be able to return nothing if validation succeeds', () => {
    const sut = makeSut()

    expect(sut.validate({ field: 'any value' })).toBeFalsy()
  })
})
