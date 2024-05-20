import { InstanceOptions, IOContext, JanusClient } from "@vtex/api"


export class SkusClient extends JanusClient {
  private readonly routes = {
      getSku: (account: string, refId: string) => `http://${account}.vtexcommercestable.com.br/api/catalog_system/pvt/sku/stockkeepingunitidbyrefid/${refId}`,

      getSkuList:(account: string, productId: string) => `http://${account}.vtexcommercestable.com.br/api/catalog_system/pvt/sku/stockkeepingunitByProductId/${productId}`,

      createSku: (account: string) => `http://${account}.vtexcommercestable.com.br/api/catalog/pvt/stockkeepingunit`
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

  public async getSkuListByProductId(productId: string): Promise<any> {
    try {
      const response  = await this.http.get(this.routes.getSkuList(this.context.account, productId))
      return response
    }
    catch(err) {
      throw new Error(`Error fetching SKU LIST: ${err.message}`)
    }
  }

  public async createSku(body: any): Promise<any> {
    try {
      const response = await this.http.post(this.routes.createSku(this.context.account), body )
      return response
    } catch (err) {
      throw new Error(`Error creating SKU: ${err.message}`)
    }
  }

}








