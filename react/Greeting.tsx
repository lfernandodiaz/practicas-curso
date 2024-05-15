import React from 'react'
import { Input } from 'vtex.styleguide'
import {useCssHandles} from "vtex.css-handles"
import "./Greeting.css"
type Props = {
  name: string;
  imageUrl: string;
  date: Date;
}

const CSS_HANDLES = ['imageSiteHandle'] as const

function Greeting({ name,  imageUrl, date }: Props) {
  const handles = useCssHandles(CSS_HANDLES)
  return (
    <>
    <div className="">
      <p>Hola {name}</p>
      <img src={imageUrl} alt="" className={`${handles.imageSiteHandle}`}/>
      <Input
            value={date}
            readOnly={true}
            label="Read-only"
          />
    </div>
    </>
  )



}

Greeting.schema = {
  title: 'Saludo',
  description: "Saludo a un usuario",
  type: "object",
  properties: {
    name: {
      title: "Nombre",
      description: "Nombre del usuario a saludar",
      type: "string",
      default: "Estudiante"
    },
    imageUrl: {
      title: 'Imagen',
      default: '',
      type: 'string',
      widget: { //here you can choose a file in your computer
         "ui:widget": "image-uploader"
      }
    },
    date: {
      title: "Fecha",
      description: "Fecha actual",
      type: "string",
      default: new Date().toISOString()
    }
  }
}

export default Greeting



