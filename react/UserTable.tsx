import React, { FC, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader, Table} from 'vtex.styleguide'
import {useQuery} from 'react-apollo'

import './styles.global.css'
import NewUserForm from './components/NewUserForm'
import EditUserForm from './components/EditUserForm'
import  getAllUsers  from './queries/users.graphql'


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


  const getUsers = async () => {
    const {data, loading, error} = await useQuery(getAllUsers)
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
  } , [isOpen, isOpenEdit])

  const downloadData = () => {
    const data = users.map((user) => {
      return {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,

      }
    })

    const csv = data.map((row) => {
      return Object.values(row).join(',')
    }).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('hidden', '')
    a.setAttribute('href', url)
    a.setAttribute('download', 'usedata.csv')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

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
        download: {
          label: <FormattedMessage id='admin-example.table.export'></FormattedMessage>,
          handleCallback: () => {
            downloadData()
          },
        },
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
            }
          }
          emailProp={emailProp} userinfo={user}></EditUserForm>
      </PageBlock>
    </Layout>
  )
}

export default AdminExample
