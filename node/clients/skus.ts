import { InstanceOptions, IOContext, JanusClient } from "@vtex/api"


export class SkusClient extends JanusClient {
  private readonly routes = {
    getSku: (account: string, refId: string) => `http://${account}.vtexcommercestable.com.br/api/catalog_system/pvt/sku/stockkeepingunitidbyrefid/${refId}`
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
    try {
      const response = await this.http.get(this.routes.getSku(this.context.account, refId))
      return response
    } catch (err) {
      throw new Error(`Error fetching skuId: ${err.message}`)
    }
  }

}








