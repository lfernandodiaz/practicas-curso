import React from "react";
import {Button} from "vtex.styleguide"
import { useMutation   } from 'react-apollo'
import deleteUserMutation from '../queries/deleteUser.graphql'
interface DeleteUserButtonProps {
  email: string
  onClose: () => void
}

function DeleteUserButton(
  {email, onClose} : DeleteUserButtonProps
) {

  const [deleteUser, {data, loading, error}] = useMutation(deleteUserMutation)
  console.log(data)
  console.log(loading)
  console.log(error)

  return <Button variation="danger"
  onClick= {
    async () => {
      try{
        deleteUser({
          variables:{
            email: email
          }
        })
        onClose()
      } catch (error) {
        alert('Error deleting user')
      }
    }
  }
  >Delete User</Button>;
}

export default DeleteUserButton
