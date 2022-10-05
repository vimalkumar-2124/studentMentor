import React, {useContext, useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
// import Button from 'react-bootstrap/Button';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'
import { ContextApi} from '../App';
import axios from 'axios';
export default function AllMentor() {
    // let navigate = useNavigate()
    let contextApi = useContext(ContextApi)
    let [mentorName, setMentorName] = useState([])
    useEffect(() => {
      getData()
    }, [])
    let getData = async() => {
      let res = await axios.get(`${contextApi.apiUrl}/mentors`)
      if(res.data.statusCode === 200)
        setMentorName(res.data.mentors)
    }
    // let handleDelete = async(i) =>{
    //     // let data = [...context.mentorName]
    //     // data.splice(i,1)
    //     // context.setMentorName(data)
    //     let res = await axios.delete(`${mentor_url}/${i}`)
    //     if(res.status === 200)
    //       getData()
    // }
  return <div>
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
                mentorName.map((e,id)=>{
                    return <tr className='home' key={id}>
                        <td>{id+1}</td>
                        <td >{e.name}</td>
                        {/* <td>
                            <Button variant='primary' onClick={()=>navigate(`/edit-mentor/${e.id}`)}> <EditIcon/></Button>
                            &nbsp;
                            &nbsp;
                            <Button variant='danger' onClick={()=>handleDelete(e.id)}><DeleteForeverIcon/></Button>
                        </td> */}
                    </tr>
                })
            }
      </tbody>
    </Table>
  </div>
}
