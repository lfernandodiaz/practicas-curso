import React, { useEffect } from "react"
import { Modal, Input, Toggle, Button} from 'vtex.styleguide'
import { useMutation   } from 'react-apollo'
import newUserMutation from '../queries/newUser.graphql'

interface NewUserFormProps {
  isOpen: boolean
  onClose: () => void
}


function NewUserForm(
  {isOpen, onClose}: NewUserFormProps
) {

  const [isOpenC, setIsOpenC] = React.useState(false)
  const [validate, setValidate] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')

  const [newUser, {data, loading, error}] = useMutation(newUserMutation)
  console.log(data)
  console.log(loading)
  console.log(error)


  useEffect(() => {
    setIsOpenC(isOpen)
  }, [isOpen])

  const handleNewUser = async () => {
    console.log('handleNewUser')
    try{
      newUser({
        variables: {
          email: email,
          firstname: firstName,
          lastname: lastName,
          validate: validate
        }
      })
      onClose()

    } catch (error) {
      alert('Error creating user')
    }
  }

  return  (
    <Modal
    centered
    isOpen={isOpenC}
    onClose={() => {
      console.log('onClose')
      setIsOpenC(false)
      onClose()

    }}>
      <div className="dark-gray">
        <div className="mb4">
        <Input
          placeholder="Regular with data-attributes"
          dataAttributes={{ 'hj-white-list': true, test: 'string' }}
          label="Email"
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
          }
        />
        </div >

          <div className="mb4">
          <Input
          placeholder="Regular with data-attributes"
          dataAttributes={{ 'hj-white-list': true, test: 'string' }}
          label="First Name"
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)
          }
        />
          </div>
       <div className="mb4">
       <Input
          placeholder="Regular with data-attributes"
          dataAttributes={{ 'hj-white-list': true, test: 'string' }}
          label="Last Name"
          onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)
          }

        />
       </div>

        <div className="mb4">
        <Toggle
          checked={validate}
          onChange={() => {
            setValidate(!validate)
          }}
          />
        </div>


        <div className="mt4">
          <Button variation="primary" onClick={
            () => {
              handleNewUser()
            }
          }>New user</Button>
        </div>
      </div>
    </Modal>
  )
}

export default NewUserForm




