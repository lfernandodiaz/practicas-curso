
interface Args {
  email: string
  firstname: string
  lastname: string
  validate: boolean
}

export const editUser = async (
    _: any,
    { email, firstname, validate, lastname }: Args,
    { clients: { user: userClient } }: Context
) => {
    const user = {
        email,
        firstname,
        lastname,
        validate
    }
    try {
        const userbyemail:any = await userClient.getDocumentByEmail(email)
        const documentID = userbyemail[0].id

        try{
            const upuser = await userClient.updateUser(user, documentID)
            console.log(upuser)
            return{
                response: "se edito el usuario "
            }
        }
        catch (err){
            console.log(err)
            return{
                response:" no se pudo editar "
            }
        }
    }
    catch (err){
        console.log(err)
        return {
            response:"no se encontro el documento"
        }
    }
}
