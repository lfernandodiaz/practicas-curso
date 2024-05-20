import { json } from "co-body"

export async function findsku(ctx: Context, next: () => Promise<any>) {
  const {

    clients: {sku},
    vtex: {
      route: {params}
    },
  }: Context = ctx

  const body = await json(ctx.req)

  const {productid} = params
  const productId = productid as string


  const skuListResponse = await sku.getSkuListByProductId(productId)
  console.log(skuListResponse)


  //se compara si el sku ya existe pero sin recorrer todo el arreglo explicitamente, utilizando el  método some de los arrays
  const newSkuName = body.Name
  const skuExists = skuListResponse.some((skuItem: any) => skuItem.Name === newSkuName)
  console.log(skuExists)

  if (skuExists) {
    ctx.status = 500
    ctx.body = {
      error: "SKU already exists"
    }
  } else {
    ctx.state.body = body
    await next()
  }


}

