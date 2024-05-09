import React, {useEffect} from 'react';
import { useState } from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
  const [log, setLog] = useState(false);

  useEffect(()=>{
    const bruto = localStorage.getItem('dataUser');
    const user = JSON.parse(bruto);
    if (user) {
      setLog(true);
      console.log('data dentro de la ruta :: ', log)
    }
  }, [])



  return (
    <>
    { log == true ? <Component /> : <Navigate to="/"/> }
    
    </>
      
  );
};

export default PrivateRoute;