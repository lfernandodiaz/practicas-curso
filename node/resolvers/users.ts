export const users = async (
  _: any,
  __: any,
  { clients: { user } }: Context
) => user.getDocumentByEmail()
