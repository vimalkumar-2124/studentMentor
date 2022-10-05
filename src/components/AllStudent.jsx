import React, { useContext, useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
// import Button from 'react-bootstrap/Button';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ContextApi } from '../App';

export default function AllStudent() {
let navigate = useNavigate()
let contextApi = useContext(ContextApi)
let [studentName, setStudentName] = useState([])
useEffect(() =>{
    getData()
}, [])

const getData = async() => {
    let res = await axios.get(`${contextApi.apiUrl}/students`)
    setStudentName(res.data.students)

}
// let handleDelete = async(id) =>{
//     // let data = [...context.studentName]
//     // data.splice(i,1)
//     // context.setStudentName(data)
//     let res = await axios.delete(`${student_url}/${id}`)
//     if(res.status === 200)
//         getData()
// }
  return <>
  <Table  bordered>
      <thead>
        <tr className='home'>
          <th>#</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
            {
                studentName.map((e,id)=>{
                    return <tr className='home' key={id}>
                        <td>{id + 1}</td>
                        <td >{e}</td>
                        {/* <td>
                            <Button variant='primary' onClick={()=>navigate(`/edit-student/${e.id}`)}> <EditIcon/></Button>
                            &nbsp;
                            &nbsp;
                            <Button variant='danger' onClick={()=>handleDelete(e.id)}><DeleteForeverIcon/></Button>
                        </td> */}
                    </tr>
                })
            }
      </tbody>
    </Table>
  </>
}
