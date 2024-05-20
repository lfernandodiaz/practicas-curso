import { InstanceOptions, IOContext, JanusClient } from "@vtex/api"


export class SkusClient extends JanusClient {
  private readonly routes = {
    getOrder: (account: string, refId: string) => `http://${account}.vtexcommercestable.com.br/api/catalog_system/pvt/sku/stockkeepingunitidbyrefid/${refId}`
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
  public async getSkuId(refId: string): Promise<VtexOrder> {
    return this.http.get(this.routes.getOrder(this.context.account, refId))
  }
}








