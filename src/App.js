import React from 'react'
import Login from './componets/Login/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import Dashboard from './componets/Dashboard/Dashboard'
import Grid from './componets/Pages/grid/Grid';


 function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/grid" element={<Grid />} /> 
          
        </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;



