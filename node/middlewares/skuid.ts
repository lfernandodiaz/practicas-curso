export async function skuid(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: {params}
    },
    clients : {sku}
  } = ctx


  const {refid} = params
  const refId = refid as string

  try {
    const skuData = await sku.getSkuId(refId)
    ctx.status = 200
    ctx.body = {
      skuId: skuData
    }

   } catch (error) {

    if (error.message.includes("404")) {
      ctx.status = 404
      ctx.body = {
        message: "Sku not found"
      }
    }
    else {
      ctx.status = 500
      ctx.body = {
        message: "Internal server error"
      }
    }
  }

  await next()

}
