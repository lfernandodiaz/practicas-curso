import { MasterData } from "@vtex/api";

export class MasterDataClient extends MasterData {


  private dataEntity = 'vtexiocurso' //nombre de la entidad
  private schemaName = 'v1'


  public async createUser(body: any): Promise<any> {
    console.log(body)

    try {
      const userExists = await this.getDocumentByEmail(body.email)
      if (userExists.length > 0) {
        return {
          error: 'User already exists'
        }
      }
      else {
        try {
          const newuser = await this.createDocument({
           dataEntity: this.dataEntity,
           fields: {
             email: body.email,
             firstname: body.firstName,
             lastname: body.lastName,
             validate: body.validate,
           },
           schema: this.schemaName
         })
         return newuser

       }
       catch (err) {
         return err
       }
      }
    }
    catch (err) {
      return err
    }


  }

  public async getDocumentByEmail(email: string): Promise<any> {
    try {
      const document = await this.searchDocuments({
        dataEntity: this.dataEntity,
        fields: ["email", "firstname", "lastname", "id"],
        schema: this.schemaName,
        where : email ? `email=${email}` : '',
        pagination: {
          page: 1,
          pageSize: 25
        }
      })

      return document
    }
    catch (err) {
      return err
    }
  }

  public async updateUser(body: any, id: string): Promise<any> {
    console.log(body, id)
    try {
      const updatedUser = await this.updatePartialDocument({
        dataEntity: this.dataEntity,
        id: id,
        fields: {
          email: body.email,
          firstname: body.firstName,
          lastname: body.lastName,
          validate: body.validate
        },
        schema: this.schemaName
      })
      return updatedUser
    }
    catch (err) {
      console.log(err)
      return err
    }
  }
}
