interface Args {
  email: string
}

export const deleteUser = async (
  _: any, { email }: Args, { clients: { user: userClient } }: Context
) => {

  try {
    const document = await userClient.getDocumentByEmail(email)
    const documentId = document[0].id

    try {
      const deleteResponse = await userClient.deleteUser(documentId)
      console.log(deleteResponse)
      return {
        response: "User deleted successfully"
      }
    }
    catch (error) {
      console.log(error)
      return {
        response: "Error deleting user"
      }
    }
  } catch (error) {
    console.log(error)
    return {
      response: "User not found"
    }
  }

}

