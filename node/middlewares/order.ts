export async function order(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: {params}
    },
    clients : {order}
  } = ctx


  const {orderid} = params
  const orderId = orderid as string


  try {
    const orderData = await order.getOrder(orderId)
    ctx.status = 200
    ctx.body = {
      ...orderData
    }

   } catch (error) {

    if (error.message.includes("404")) {
      ctx.status = 404
      ctx.body = {
        message: "Sku not found"
      }
    }
    else if (error.response.status === 403) {
      ctx.status = 403
      ctx.body = {
        message: "Forbidden"
      }
    }
    else {
      console.log(error.response)
      ctx.status = 500
      ctx.body = {
        message: "Internal server error"
      }
    }
  }

  await next()

}
