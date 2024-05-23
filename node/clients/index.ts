import { IOClients } from '@vtex/api'

import Status from './status'
import { OrderClient } from './orders'
import { SkusClient } from './skus'
import { MasterDataClient } from './masterdata'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }
  public get order(){
    return this.getOrSet('order', OrderClient)
  }
  public get sku(){
    return this.getOrSet('sku', SkusClient)
  }
  public get masterdata(){
    return this.getOrSet('masterdata', MasterDataClient)
  }
}
