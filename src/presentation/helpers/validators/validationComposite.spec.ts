import { MissingParamError } from '@presentation/errors'
import { Validation } from '../../protocols'
import { ValidationComposite } from './validationComposite'

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  class ValidationStub implements Validation {
    validate(data: any): Error {
      return null
    }
  }
  const validationStubs = [new ValidationStub(), new ValidationStub()]
  const sut = new ValidationComposite(validationStubs)

  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  it('should be able to return an error if any validations fails', () => {
    const { sut, validationStubs } = makeSut()

    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))

    expect(sut.validate({})).toEqual(new MissingParamError('field'))
  })

  it('should be able to return the first error if one validations fails', () => {
    const { sut, validationStubs } = makeSut()

    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))

    expect(sut.validate({})).toEqual(new Error())
  })

  it('should be able to return nothing when validation succeeds', () => {
    const { sut } = makeSut()

    expect(sut.validate({})).toBeFalsy()
  })
})
