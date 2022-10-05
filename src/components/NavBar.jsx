import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
export default function NavBar() {
  return <>
    <div>

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="home">Students and Mentor Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className='ms-auto'>
            <Nav.Link  href="home" className='links'><i className="fa-solid fa-house-user" ></i> Home</Nav.Link>
            &nbsp;
            <Nav.Link  href="all-students" className='links'><i className="fa-solid fa-people-group"></i> All Students</Nav.Link>
            &nbsp;
            <Nav.Link  href="all-mentors" className='links'><i className="fa-solid fa-user-tie"></i> All Mentors</Nav.Link>
            &nbsp;
            <Nav.Link href="#notification" className='links'><i className="fa-solid fa-bell"></i> Notification</Nav.Link>
            &nbsp;
            <Nav.Link href="#admin" className='links'><i className="fa-solid fa-user"></i> Admin</Nav.Link>
            &nbsp;
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  </>
}
