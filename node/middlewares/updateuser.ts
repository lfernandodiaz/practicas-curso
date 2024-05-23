import { json } from "co-body"

export async function updateuser(ctx: Context, next:() => Promise<any>){
  const {
    clients: {masterdata},
    vtex: {
      route: {params}
    }
  } = ctx

  const {email} = params
  const userEmail = email as string

  let documentId = ''

  const body = await json(ctx.req)

  try {
    const user = await masterdata.getDocumentByEmail(userEmail)
    documentId = user[0].id
  }
  catch (err) {
    ctx.status = 500
    ctx.body = {
      error: `Error finding user: ${err.message}`
    }
  }
  try  {

    await masterdata.updateUser(body, documentId)
    ctx.status = 200
    ctx.body = {
      message: "User updated successfully"
    }
  }
  catch (err) {
    ctx.status = 500
    ctx.body = {
      error: `Error updating user: ${err.message}`
    }
  }
  await next()

}
