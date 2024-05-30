import type { UserInput } from '../typings/custom'

interface Args {
  email: string
  firstname: string
  lastname: string
  validate: boolean
}

export const newUser = async (
  _: any, { email, firstname, lastname, validate }: Args, { clients: { user: userClient } }: Context
) => {

  const user: UserInput = {
    email,
    firstname,
    lastname,
    validate
  }
  console.log(user)
  const userResponse = await userClient.createUser(user)
  console.log(userResponse)
  return userResponse
}



