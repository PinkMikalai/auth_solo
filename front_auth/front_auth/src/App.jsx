import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProfilePage from './components/ProfilePage';
import MyInfosPage from './components/myInfosPage';
import "./App.css";

import Footer from './components/layout/Footer';
import Header from './components/layout/Header';


function App() {

  return (
    <>
      {/*active le systeme de router*/}
      <BrowserRouter>
        <Header/>
        {/*defini le conteneur des routes*/}
        <Routes>
          {/*route pour register !*/}
          <Route path='/register' element={<RegisterForm/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/my-infos' element={<MyInfosPage/>}/>
          {/*si aucune route ne correspond -> register */}
          <Route path='*' element={<Navigate to="/login"/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App
