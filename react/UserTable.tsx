import React, { FC, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader, Table} from 'vtex.styleguide'
import {useQuery} from 'react-apollo'

import './styles.global.css'
import NewUserForm from './components/NewUserForm'
import EditUserForm from './components/EditUserForm'
import  getAllUsers  from './queries/users.graphql'
import ExportData from './components/ExportData'


 type User = {
  rowData : {
    firstname: string
    email: string
    lastname: string
    validate: boolean
  }
}


const AdminExample: FC = () => {


  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [emailProp, setEmailProp] = useState('')

  const [users, setUsers] = useState<any[]>([])
  const [user, setUser] = useState<any>()

  const defaultSchema = {
    properties: {
      firstname: {
        title: 'Name',
        width: 300,
      },
      lastname: {
        title: 'Last name',
        width: 300,
      },

      email: {
        title: 'Email',
        minWidth: 350,
      },
      validate: {
        title: 'Validate',
        width: 200,
        cellRenderer: ({ cellData }: { cellData: boolean }) => {
          return cellData ? (
            <div className="">Yes</div>
          ) : (
            <div className="">No</div>
          )
        },
      }
    },
  }
  const  {data, loading, error, refetch}= useQuery(getAllUsers)
    console.log(data)
    console.log(loading)
    console.log(error)


  const getUsers = async () => {
    const  {data, loading, error, refetch}= await useQuery(getAllUsers)
    refetch()
    console.log(data)
    console.log(loading)
    console.log(error)

    return data?.users
  }

  getUsers().then(
    (users) => {
    setUsers(users)
    }
  )

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users)
    })
  } , [isOpen, isOpenEdit, ])


  const newUser = (body?: any) => {
    return  fetch('https://jsonplaceholder.typicode.com/users'), {
      method: 'POST',
      body: JSON.stringify(body)
    }
  }

  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin-example.hello-world" />}
        />
      }
    >
      <PageBlock variation="full">
      <ExportData users={users} onDownload={
        () => {
          alert('Downloaded')
        }
      }/>
      <Table
      fullWidth
      schema={defaultSchema}
      items={users}
      density="high"
      onRowClick={({rowData}: User) => {
        setEmailProp(rowData.email)
        setIsOpenEdit(true)
        setUser(rowData)



      }}
      toolbar={{
        upload: {
          label: 'Import',
          handleCallback: () => alert('Callback()'),
        },
        fields: {
          label: 'Toggle visible fields',
          showAllLabel: 'Show All',
          hideAllLabel: 'Hide All',
        },
        extraActions: {
          label: 'More options',
          actions: [
            {
              label: <label className='c-danger bg-washed-red ba2 br-pill pa2'>Eliminar</label>,
              handleCallback: () => alert('An action'),
            },
          ],
        },
        newLine: {
          label: 'New',
          handleCallback: () => {
            newUser()
            setIsOpen(true)

          },
        },
      }}
      />

      <NewUserForm isOpen={isOpen} onClose={
       () => {
        console.log('closing')
          setIsOpen(false)
        }
      }></NewUserForm>
      <EditUserForm isOpen={isOpenEdit} onClose={
            () => {
              setIsOpenEdit(false)
              refetch()
              getUsers().then(
                (users) => {
                setUsers(users)
                }
              )
            }
          }
          emailProp={emailProp} userinfo={user}></EditUserForm>
      </PageBlock>
    </Layout>
  )
}

export default AdminExample
