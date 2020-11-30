import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import 'antd/dist/antd.css';

const ENDPOINT = "ws://stocks.hulqmedia.com"
var loopNumber = 1

function App() {
  const [columns, setcolums] = useState([])
  const [dataSource, setdatasource] = useState([])

  useEffect(() => {
    const socket = new WebSocket(ENDPOINT)
    socket.onopen = () => {
      console.log("connected")
    }
    socket.onmessage = (res) => {
      let response = JSON.parse(res.data)
      let dataSource = [], count = 1;
      let date= new Date()      
      for (let data of response) {
        dataSource.push({
          key: count++,
          name: data[0],
          price: data[1],
          time: date.toLocaleTimeString()
        })
      }
      const columns = [
        {
          title: "Company name",
          dataIndex: "name",
          key: "name",
          className:"text-center text-uppercase text-dark font-weight-bold",
          render: text => <a className='text-info text-capitalize'>{text}</a>,
        },
        {
          title: "Company price",
          dataIndex: "price",
          key: "price",
          className:"text-center text-dark font-weight-bold text-uppercase",
          render: text => <a className='text-secondary text-lowercase'>{text}</a>,
        },
        {
          title: "Time",
          className:"text-center text-dark font-weight-bold text-uppercase",
          dataIndex: "time",
          key: "time",
          render: text => <a className='text-secondary text-lowercase'>{text}</a>,
        }
      ]

      setcolums(columns)
      setdatasource(dataSource)
    }
    socket.onclose = () => {
      console.log("closed")
    }
  }, [])

  return (
    <div>
      

      <Table columns={columns} dataSource={dataSource} pagination={false} bordered 
        size = 'middle'
        title={() => <h1 style={{ textAlign: "center" }}  className="text-light bg-dark">Stock Market Updates</h1>}
    
      />
    </div>
  );
}

export default App