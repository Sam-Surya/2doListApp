import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Forgotpassword from './components/Forgotpassword';
import Resetpassword from './components/Resetpassword';
import Dashboard from './components/Dashboard';
import CompletedTask from './components/CompletedTask';
import PendingTask from './components/PendingTask';
import DeletedTask from './components/DeletedTask';
import { I18nextProvider } from 'react-i18next';

import { UserProvider } from './components/UserContext';
import CustomSpinner from './components/CustomSpinner';



function App() {
  return (
   
    <UserProvider>
      
      <BrowserRouter>
        <Routes>
        
          <Route path="/" element={<Login />} />
          <Route path="/Registration" element={<Register />} />
          <Route path="/Forgot" element={<Forgotpassword />} />
          <Route path="/ResetPassword" element={<Resetpassword />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/CompletedTask" element={<CompletedTask />} />
          <Route path="/PendingTask" element={<PendingTask />} />
          <Route path="/DeletedTask" element={<DeletedTask />} />
        </Routes>
      </BrowserRouter>
      
      </UserProvider>
     
  );
}

export default App;
