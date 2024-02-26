import './App.css';
import React, { useEffect, useState } from 'react';
import LoginForm from './pages/log_index';
import MyTabs from './pages/admin/admin_view_index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openSession = () => {
    alert('Ingresó correctamente');
    setIsLoggedIn(true);
  };

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/main'; // Redirecciona a /main cuando el usuario inicia sesión
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm set_is_log={openSession} />} />
          <Route index path='/main' element={<MyTabs/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

