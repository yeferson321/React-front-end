import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import DataProvider from './context/DataContext'
import Init from './components/Startt/Init';
import Paypal from './components/Paypal/Paypal';
import Payouts from './components/Payouts/Payouts';
import Check from './components/Check/Check';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import Welcome from './components/Welcome/Welcome';
import Expired from './components/Expired/Expired';
import Login from './components/Login/Login';
import ForgetPassword from './components/ForgetPassword/Forget';

function App() {

  const token = localStorage.getItem('token');

  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Init />} />
        <Route path="/login" element={<Login />} />
        <Route path="/paypal" element={<Paypal />} />
        <Route path="/payouts" element={<Payouts />} />
        <Route path="/check" element={<Check />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgetpassword" element={<ForgetPassword/>} /> 
        <Route path="/welcome" element={ token ? (<Welcome />):( <Navigate to="/expired"/>)} />
        <Route path="/expired" element={<Expired />} />
        <Route path="*" element={<Init />} />
    
      </Routes>
      </DataProvider>

  );
}

export default App;
