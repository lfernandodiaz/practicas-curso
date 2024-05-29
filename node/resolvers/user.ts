export const user = async (
  _: any,
  { email }: { email: string },
  { clients: { user } }: Context
) => {
  const userResponse : any = await user.getDocumentByEmail(email)
  console.log(userResponse)
  return await userResponse[0]
}
