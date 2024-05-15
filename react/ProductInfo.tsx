import React, { useEffect, useState } from "react";
import {useProduct} from "vtex.product-context"
import { useQuery } from "react-apollo"
import productReleaseDate from "./queries/productReleaseDate.graphql"
import { FormattedMessage } from "react-intl";
function ProductInfo() {

  const productContext = useProduct()
  const [brand, setBrand] = useState('')
  console.log(productContext)


  const slug = productContext?.product?.linkText

  const { data, loading, error} = useQuery(productReleaseDate, {
    variables: {
      slug
    }
  } )
  console.log("ReleaseDate", data)
  console.log("Loading", loading)
  console.log("Error", error)

  const releaseDate = data?.product?.releaseDate
  const formattedDate = new Date(releaseDate).toLocaleDateString(
  "es-ES",
  { year: "numeric", month: "long", day: "numeric" }
  )
  useEffect(() => {
    if(productContext && productContext.product) {
      setBrand(productContext.product.brand)
    }
  }, [])
  return (
    <>
      <div>{brand}</div>
      <div><FormattedMessage id="productinfo.release"/> {formattedDate}</div>
    </>
  )
}

export default ProductInfo
