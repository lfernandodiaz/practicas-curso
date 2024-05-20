import React from "react"
import { Modal} from 'vtex.styleguide'
interface NewUserFormProps {
  isOpen: boolean
  onClose: () => void
}


function NewUserForm(
  {isOpen, onClose}: NewUserFormProps
) {


  return  (
    <Modal
    centered
    isOpen={isOpen}
    onClose={() => {
      onClose
    }}>
      <div className="dark-gray">
        Hola mundo
      </div>
    </Modal>
  )
}

export default NewUserForm




