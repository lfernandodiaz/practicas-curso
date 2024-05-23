import { json } from "co-body"

export async function newuser(ctx: Context, next:() => Promise<any>){
  const {
    clients: {masterdata}
  } = ctx

  const body = await  json(ctx.req)
  try {
    const newUser = await masterdata.createUser(body)


    if (newUser.error) {
      ctx.status = 500
      ctx.body = {
        newUser
      }
    }
    else {
      ctx.status = 200
      ctx.body = {
        message: "User created successfully",
        data: newUser
      }
    }

  }
  catch(err) {
    ctx.status = 500
    ctx.body = {
      error: `Error creating document: ${err.message}`
    }
  }
  await next()

}
