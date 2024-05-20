import { InstanceOptions, IOContext, JanusClient } from "@vtex/api"


export class OrderClient extends JanusClient {
  private readonly routes = {
    getOrder: (account: string, orderId: string) => `http://${account}.vtexcommercestable.com.br/api/oms/pvt/orders/${orderId}`
  }
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        VtexIdClientAutCookie: context.authToken,
        'Content-Type': 'application/json',
      }
    })
  }
  public async getOrder(orderId: string): Promise<VtexOrder> {
    return this.http.get(this.routes.getOrder(this.context.account, orderId))
  }
}








