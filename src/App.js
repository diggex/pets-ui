import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import './index.css'
import { Tree, Space, Card } from 'antd'
import {
  DownOutlined
} from '@ant-design/icons'

const treeData = []

function App () {
  const [owners, setOwners] = useState(false)
  const [expandedKeys, setExpandedKeys] = useState(false)

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_API_HOST}/api/owners`)
      .then(async (response) => {
        const responseData = await response.json()
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (responseData && responseData.message) || response.statusText
          return Promise.reject(error)
        }

        let i = 0
        const keys = []

        for (const key in responseData.data) {
          treeData.push({
            title: key,
            key: i,
            children: []
          })

          keys.push(i)

          for (const k in responseData.data[key]) {
            treeData[i].children.push({
              title: responseData.data[key][k]
            })
          }

          i++
        }

        setOwners(treeData)
        setExpandedKeys(keys)
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }, [])

  return (
        <Space direction="vertical">
        <Card title="Owners of Pets" style={{ width: 300 }}>
        <Tree
            showIcon
            defaultExpandAll
            expandedKeys={expandedKeys}
            switcherIcon={<DownOutlined />}
            treeData={owners}
        />
        </Card>
        </Space>
  )
}

export default App
