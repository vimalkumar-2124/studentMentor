import './App.css';
import React from 'react'
import NavBar from './components/NavBar';
import Home from './components/Home';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import AddStudent from './components/AddStudent';
import AddMentor from './components/AddMentor';
import AssignStudents from './components/AssignStudents';
import ChangeMentor from './components/ChangeMentor';
// import ViewMentor from './components/ViewMentor';
import AllStudent from './components/AllStudent';
import AllMentor from './components/AllMentor';
// import EditStudent from './components/EditStudent';
// import EditMentor from './components/EditMentor';


export const ContextApi = React.createContext()
const apiUrl = 'http://localhost:8000'
function App() {
  
    return <>
  <BrowserRouter>
  

  <NavBar/>
  <div>
    <ContextApi.Provider value={{apiUrl}}>

    <Routes>
      <Route path='/home' element={<Home />} ></Route>
      <Route path='add-student' element={<AddStudent/>} />
      <Route path='/add-mentor' element={<AddMentor />}></Route>
      <Route path='/assign-students' element={<AssignStudents />}></Route>
      <Route path='/change-mentor' element={<ChangeMentor />}></Route>
      {/* <Route path='view-mentor' element={<ViewMentor />}></Route> */}
      {/* <Route path="/edit-student/:id" element={<EditStudent/>}></Route> */}
      {/* <Route path="/edit-mentor/:id" element={<EditMentor/>}></Route> */}
      <Route path="/all-students" element={<AllStudent  />}></Route>
      <Route path="/all-mentors" element={<AllMentor/>}></Route>
      <Route path="*" element={<Navigate to="/home"/>}/>
    </Routes>
    </ContextApi.Provider>
  </div>
  </BrowserRouter>
  
  </>
}

export default App;
