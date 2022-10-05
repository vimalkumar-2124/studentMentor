
import React from 'react'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';


export default function Home() {
  return <>
  <div className='text-center home mt-5' >
    Home
  </div>
  
  <div className='text-center home mt-5 ms-5 gap-3'>
        <Button variant='secondary'>
            <Nav.Link  href="add-student" className='links'>Add Student</Nav.Link>
        </Button>
            {' '}
        <Button variant='secondary'>
        <Nav.Link  href="add-mentor" className='links'>Add Mentor</Nav.Link>
        </Button>{' '}
        <Button variant='secondary'> 
        <Nav.Link  href="assign-students" className='links'>Assign Students</Nav.Link>
        </Button>{' '}
        <Button variant='secondary'>
        <Nav.Link  href="change-mentor" className='links'>Change Mentor</Nav.Link>
        </Button>{' '}
        <Button  variant='secondary'>
        <Nav.Link  href="view-mentor" className='links'>View Mentor</Nav.Link>
        </Button>
  </div>
  </>
}
