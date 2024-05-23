export async function finduser(ctx: Context, next:()=> Promise<any>) {

  const {
    clients: {masterdata},
    vtex: {
      route: {params}
    }

  } = ctx

  const {email} = params
  const userEmail = email as string



  if (userEmail === "all") {
    try {
      const user = await masterdata.getDocumentByEmail('')
      console.log('user')
      console.log(user)
      ctx.status = 200
      ctx.body = {
        usercount: user.length,
        data: user,

      }
    } catch (err) {
      ctx.status = 500
      ctx.body = {
        error: `Error finding user: ${err.message}`
      }
    }
  } else {

    try {
      const user = await masterdata.getDocumentByEmail(userEmail)
      console.log('user')
      console.log(user)
      ctx.status = 200
      ctx.body = {
        usercount: user.length,
        data: user,

      }
    } catch (err) {
      ctx.status = 500
      ctx.body = {
        error: `Error finding user: ${err.message}`
      }
    }

  }
  await next()

}
