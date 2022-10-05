import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { ContextApi } from '../App'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
export default function ChangeMentor() {
  let contextApi = useContext(ContextApi)
  let [arrstudents, setArrStudents] = useState([])
  // let [arroldmentor, setArrOldMentor] = useState([])
  let [arrnewmentor, setArrNewMentor] = useState([])
  let [studentId, setStudents] = useState("")
  // let [oldMentorId, setOldMentor] = useState("")
  let [newMentorId, setNewMentor] = useState("")
  let [message, setMessage] = useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const loadNewMentors = async() =>{
    let res = await axios.get(`${contextApi.apiUrl}/mentors`)
    if(res.data.statusCode === 200)
      setArrNewMentor(res.data.mentors)

  }
  // const loadOldMentors = async() =>{
  //   let res = await axios.get(`${contextApi.apiUrl}/mentors`)
  //   if(res.data.statusCode === 200)
  //     setArrOldMentor(res.data.mentors)

  // }
  const loadStudents = async() =>{
    let res = await axios.get(`${contextApi.apiUrl}/students`)
    if(res.data.statusCode === 200)
      setArrStudents(res.data.students)
  }
  useEffect(() => {
    loadStudents()
    // loadOldMentors()
    loadNewMentors()
  }, [])

  let handleSubmit = async() => {
    let res = await axios.post(`${contextApi.apiUrl}/assignmentor/modifyMentor`,{
      studentId,
      newMentorId
    })
    if(res.data.statusCode===200){
      setShow(true)
      setMessage(res.data.message)
      
    }
  }
  return<>
   <div>
    {
      message?
      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> : <></>
    }
  </div>
  <div className='home'>
  {/* <Form.Group className="mb-3">
        <Form.Label>Select old mentor</Form.Label>
        <Form.Select onChange={(e) => setOldMentor(e.target.value)}>
          {
            arroldmentor.map((e,i) => {
              return <option value={e._id} key={i}>{e.name}</option>
            })
          }

        </Form.Select>
  </Form.Group> */}
  {/* <br/> */}
  <Form.Group className="mb-3 offset-3 col-6 text-center">
        <Form.Label>Select new mentor</Form.Label>
        <Form.Select onChange={(e) => setNewMentor(e.target.value)}>
          {
            arrnewmentor.map((e,i) => {
              return <option value={e._id} key={i}>{e.name}</option>
            })
          }

        </Form.Select>
      </Form.Group>
      <br/>
      <Form.Group className="mb-3 offset-3 col-6 text-center">
        <Form.Label>Select student</Form.Label>
        <Form.Select onChange={(e) => setStudents(e.target.value)}>
          {
            arrstudents.map((e,i) => {
              return <option value={e._id} key={i}>{e.name}</option>
            })
          }

        </Form.Select>
      </Form.Group>
  </div>
  <div className='mt-3' style={{'textAlign':'center'}}>

        <Button variant="primary" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </div>
  </>
}
