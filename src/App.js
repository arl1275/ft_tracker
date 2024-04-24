import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/log_index';
import MyTabs from './pages/admin/admin_view_index';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openSession = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const bruto = localStorage.getItem('dataUser');
    const user = JSON.parse(bruto);
    if (isLoggedIn && user.tocken) {
      window.location.href = '/main';
    }
    document.title = 'KELLER';
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm set_is_log={openSession} />} />
          <Route path="/main" element={  <MyTabs/>}/>
          <Route path="*" element={<div>ERROR</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
