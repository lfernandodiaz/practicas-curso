import React from "react";
import {Button} from "vtex.styleguide"

interface ExportDataProps {
  users: any
  onDownload: () => void
}


function ExportData({users, onDownload} : ExportDataProps) {

  const downloadData = (users: any[]) => {
    const data = users.map((user: any) => {
      return {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        validate: user.validate
      }
    })

    const csv = data.map((row: any) => {
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
    onDownload()
  }

  return <Button onClick={
    () => {
      downloadData(users)
    }
  } variation="danger">Export Data</Button>;
}

export default ExportData
