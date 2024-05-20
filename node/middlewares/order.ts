export async function order(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: {params}
    },
    clients : {order}
  } = ctx


  const {orderid} = params
  const orderId = orderid as string

  ctx.state.orderid = orderId

  const orderData = await order.getOrder(orderId)


  ctx.status = 200
  ctx.body = orderData

  await next()

}
