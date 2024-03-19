import './App.css';
import React, { useEffect, useState } from 'react';
import LoginForm from './pages/log_index';
import MyTabs from './pages/admin/admin_view_index';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { getItem, setItem, updateItem, deleteItem } from './utils/local';
// import axios from 'axios';
// import { bk_dir } from './conf/configuration.file';
// import { FlipToBackOutlined } from '@mui/icons-material';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openSession = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    if (isLoggedIn ) {
      window.location.href = '/main'; // Redirecciona a /main cuando el usuario inicia sesión
    }
    document.title = 'KELLER';
  }, [isLoggedIn]);


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm set_is_log={openSession} />} />
          <Route path="/main" element={ <MyTabs/> } />
          <Route path="*" element={<div>ERROR</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
