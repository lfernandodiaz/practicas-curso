
export async function createsku(ctx: Context, next: () => Promise<any>){
  const {
    clients: {sku},
  }: Context = ctx

  const body = ctx.state.body


  try {
    const createSkuResponse = await sku.createSku(body)
    ctx.status = 200
    ctx.body = createSkuResponse
  }
  catch(err) {
    ctx.status = 500
    ctx.body = {
      error: `Error creating SKU: ${err.message}`
    }

  }

  await next()

}
