import type { UserInput } from '../typings/custom'

interface Args {
  user: UserInput
}

export const newUser = async (
  _: any, { user }: Args, { clients: { user: userClient } }: Context
) => {
  const userResponse = await userClient.createUser(user)
  console.log(userResponse)
  return userResponse
}



