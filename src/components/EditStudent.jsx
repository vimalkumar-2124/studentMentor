// import React, {useState, useEffect} from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import axios from 'axios'
// export default function EditStudent() {
//     let params = useParams()
//     // let context = useContext(StudentContext)
//     let [name, setName] = useState("")
//     let navigate = useNavigate()
//     // useEffect(() => {
//     //     getData()
//     // }, [])
//     // const getData = async() => {
//     //     let res = await axios.get(`${student_url}/${params.id}`)
//     //     setName(res.data.name)
//     // }
//     let handleSubmit =async() => {
    

//         let data = {name}
//         // let student = [...context.studentName]
//         // student.splice(params.id, 1 , data)
//         // context.setStudentName(student)
//         let res = await axios.put(`${student_url}/${params.id}`, data)
//         if(res.status === 200)
//             navigate('/all-students')
        
//     }
//     let handleCancel = () => {
//         navigate('/all-students')
//     }
//   return <div className='home'>
//     <Form>
//     <Form.Group className="mb-3">
//         <Form.Label>Update Student Name</Form.Label>
//         <Form.Control type="text" placeholder="Edit Name"  value={name} onChange={(e) => setName(e.target.value)}/>
//       </Form.Group>
//       {name.length === 0 ?
//       <div style={{'color':'red'}}>
//         * Required
//       </div>
//       :
//       <Button variant="primary" onClick={()=>handleSubmit()}>
//         Submit
//       </Button> 
//       }
//       {' '}
//       <Button variant="primary" onClick={()=>handleCancel()}>
//         Cancel
//       </Button>
//     </Form>
//   </div>
// }
