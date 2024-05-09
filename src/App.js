// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useHref } from 'react-router-dom';
import LoginForm from './pages/log_index';
import MyTabs from './pages/admin/admin_view_index';
import PrivateRoute from './components/any_components/privateRoute';// Asegúrate de importar correctamente


function App() {
  const [isLogged, setIsLogged] = useState(false);


  const openSession = () => {
    setIsLogged( true );
  };

  useEffect(() => {
    // const bruto = localStorage.getItem('dataUser');
    // const user = JSON.parse(bruto);
    if (isLogged === true) {
      setlog(true);
      window.location.href = '/main';
    }
    document.title = 'KELLER';
  }, [isLogged]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<LoginForm set_is_log={openSession}/>} />
          <Route path='/main' element={<MyTabs/>} />

          
            {/* <Route
              path='/main'
              element={<PrivateRoute component={MyTabs} />}
            /> */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
