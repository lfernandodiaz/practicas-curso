import React, { FC, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader, Table} from 'vtex.styleguide'


import './styles.global.css'
import NewUserForm from './components/NewUserForm'


 type User = {
  rowData : {
    name: string
    email: string
    number: number
  }
}


const AdminExample: FC = () => {


  const [isOpen, setIsOpen] = useState(false)


  const defaultSchema = {
    properties: {
      name: {
        title: 'Name',
        width: 300,
      },
      email: {
        title: 'Email',
        minWidth: 350,
      },
      number: {
        title: 'Number',
        // default is 200px
        minWidth: 100,
      },
    },
  }

  const users = [
    {
      name: 'John Doe',
      email: 'jogh@mail.com',
      number: 3
    },
    {
      name: 'John Doe2',
      email: 'jogh@mail.com',
      number: 2
    },
    {
      name: 'John Doe3',
      email: 'jogh@mail.com',
      number: 1
    }
  ]


  const downloadData = () => {
    const data = users.map((user) => {
      return {
        name: user.name,
        email: user.email,
        number: user.number
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

         alert(
          `you just clicked ${rowData.name}, number is ${rowData.number} and email ${rowData.email}`
        )
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
          setIsOpen(false)
        }
      }></NewUserForm>



      </PageBlock>
    </Layout>
  )
}

export default AdminExample
