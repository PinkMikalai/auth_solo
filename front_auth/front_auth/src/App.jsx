import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProfilePage from './components/ProfilePage';
import "./App.css";


function App() {

  return (
    <>
      {/*active le systeme de router*/}
      <BrowserRouter>
        {/*defini le conteneur des routes*/}
        <Routes>
          {/*route pour register !*/}
          <Route path='/register' element={<RegisterForm/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          {/*si aucune route ne correspond -> register */}
          <Route path='*' element={<Navigate to="/login"/>}/>
        </Routes>
      </BrowserRouter>  
    </>
)}

export default App
