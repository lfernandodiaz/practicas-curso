/* eslint-disable no-console */
import { json } from 'co-body'

export const resolvers = {
  Routes: {
    clearCart: async (ctx: Context) => {
      const { req } = ctx

      const body: any = await json(req)
      const email = body?.authentication?.storeUserEmail?.value ?? null

      console.log('clearCart =>', body)

      ctx.set('Content-Type', 'application/json')
      ctx.set('Cache-Control', 'no-cache, no-store')

      const res = {
        public: {
          demo: {
            value: email ? 'User Authenticated' : 'User not authenticated',
          },
        },
      }

      ctx.response.body = res
      ctx.response.status = 200
    },
  },
}
