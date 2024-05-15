import React from "react";
import { FormattedMessage } from "react-intl";
import { Button } from 'vtex.styleguide'
import { useQuery } from "react-apollo"
import productInfo from "./queries/productInfo.graphql"
import {useProduct} from "vtex.product-context"

interface ShareButtonProps {
  platformName: string,
  url: string
}

function ShareButton({platformName, url} : ShareButtonProps) {

  const productContext = useProduct()
  const slug = productContext?.product?.linkText



  const {data, loading, error} = useQuery(productInfo, {
    variables:{
      slug
    }
  })


  const productName = data?.product?.productName

  const newUrl = url + productName

  if(loading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div></div>
  }

  return (
    <>
    <a href={newUrl} target="_blank">
      <Button variation="secondary" size="small">
      <FormattedMessage id="sharebutton.text"/> {platformName}
      </Button>
    </a>

    </>
  )
}

ShareButton.schema = {
  title: "Share Button",
  description:"Editar el botón de compartir",
  type:"object",
  properties: {
    platformName: {
      title: "Nombre de la plataforma",
      type: "string",
      default: "Twitter"
    },
    url: {
      title: "Url de redirección",
      type: "string",
      default: "x.com"
    },
  }
}


export default ShareButton
