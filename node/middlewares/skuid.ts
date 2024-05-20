export async function skuid(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: {params}
    },
    clients : {sku}
  } = ctx


  const {refid} = params
  const refId = refid as string


  const orderData = await sku.getSkuId(refId)


  ctx.status = 200
  ctx.body = {
    skuId: orderData
  }

  await next()

}
