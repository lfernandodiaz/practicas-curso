import React, { useEffect } from "react";
import { Modal, Input, Toggle, Button } from 'vtex.styleguide';
import { useMutation   } from 'react-apollo'
import editUserMutation from '../queries/editUser.graphql'
type UserInfo = {
  email: string
  firstname: string
  lastname: string
  validate: boolean
}
interface EditUserFormProps {
  onClose: () => void
  isOpen: boolean
  emailProp: string
  userinfo: UserInfo
}


function EditUserForm({isOpen, onClose, userinfo}: EditUserFormProps){

  const [isOpenC, setIsOpenC] = React.useState(false)
  const [validate, setValidate] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')

  const [editUser, {data, loading, error}] = useMutation(editUserMutation)
  console.log(data)
  console.log(loading)
  console.log(error)


  const setDataForm = () => {
    if (!userinfo) return
    setEmail(userinfo.email)
    setFirstName(userinfo.firstname)
    setLastName(userinfo.lastname)
    setValidate(userinfo.validate)
  }

  const handleEditUser = async () => {

    try{
      editUser({
        variables: {
          email: email,
          firstname: firstName,
          lastname: lastName,
          validate: validate
        }
      })
      onClose()

    } catch (error) {
      alert('Error updating user')
    }
  }


  useEffect(() => {
    setIsOpenC(isOpen)
  }, [isOpen])

 useEffect(() => {
  setDataForm()
  }, [userinfo])

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
          value={email}
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
          value={firstName}
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
          value={lastName}
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
              handleEditUser()
            }
          }>Update</Button>
        </div>
      </div>
    </Modal>
  )
}

export default EditUserForm
