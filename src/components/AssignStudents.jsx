import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ContextApi } from '../App'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';

export default function AssignStudents() {
  let contextApi = useContext(ContextApi)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  let [arrstudents, setArrStudents] = useState([])
  let [arrmentors,setArrMentors] = useState([])
  let [students, setStudents] = useState([])
  let [mentorId,setMentor] = useState("")
  let [message, setMessage] = useState("")
  let navigate = useNavigate()
  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
  const loadMentors = async() =>{
    let res = await axios.get(`${contextApi.apiUrl}/mentors`)
    if(res.data.statusCode === 200)
      setArrMentors(res.data.mentors)

  }
  const loadStudents = async() =>{
    let res = await axios.get(`${contextApi.apiUrl}/students/withoutmentor`)
    if(res.data.statusCode === 200)
      setArrStudents(res.data.students)
  }

  useEffect(() => {
    loadMentors()
    loadStudents()
  }, [])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStudents(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  let handleSubmit = async() => {
    let res = await axios.post(`${contextApi.apiUrl}/assignmentor/newMentor`,{
      mentorId,
      students
    })
    if(res.data.statusCode===200){
      setShow(true)
      setMessage(res.data.message)
      
    }
  }

  return <>
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
  <div className='container'>

  <div className='mentors-wrapper'>
  <Form.Group className="mb-3 offset-3 col-6 text-center">
        <Form.Label>Select Mentor</Form.Label>
        <Form.Select onChange={(e) => setMentor(e.target.value)}>
          {
            arrmentors.map((e,i) => {
              return <option value={e._id} key={i}>{e.name}</option>
            })
          }

        </Form.Select>
      </Form.Group>
  </div>
  <br>
  </br>
  <div className='students-wrapper text-center'>
  <Form.Group className="mb-3 offset-3 col-6">
        <Form.Label>Select students</Form.Label>
        {arrstudents.length>0?
        <FormControl sx={{ m: 1, width: 300 }} style={{"backgroundColor":"white"}}>
        <Select
          id="multiple-checkbox"
          multiple
          value={students}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          { arrstudents.map((e,i) => (
            <MenuItem key={i} value={e}>
              <Checkbox checked={students.indexOf(e) > -1} />
              <ListItemText primary={e} />
            </MenuItem>
          )) }
        </Select>
      </FormControl>
      : <p style={{"color":"white"}}>Currently, all students are having mentor</p>
      }
      </Form.Group>
  </div>
  </div>
  <div className='mt-3' style={{'textAlign':'center'}}>

        <Button variant="primary" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </div>
  </>
}
