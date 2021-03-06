import { Router } from 'express'
import { adaptRoute } from '../adapters/express/expressRouteAdapter'
import { makeSignUpController } from '../factories/signup/signupFactory'
import { makeLoginController } from '../factories/login/loginFactory'

export default (router: Router): void => {
  router.post('/users/signup', adaptRoute(makeSignUpController()))
  router.post('/users/login', adaptRoute(makeLoginController()))
}
