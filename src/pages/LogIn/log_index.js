import React, { useState } from 'react';
import { bk_dir } from '../../conf/configuration.file';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const foto = require('../../assets/dist/img/images/deliver.jpg')

const LoginForm = () => {
  const [user, setUser] = useState('');
  const [_Password, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [data_user, setDataUser] = useState(null)
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const ValidateUser = async (event) => {
    event.preventDefault();
    try {
      const data = {
        user: user,
        _password: _Password,
      };

      if (data.user === '' || data._password === '') {
        alert('FAVOR INGRESE UN USUARIO Y CONTRASEÑA');
      } else {
        const response = await axios.get(`${bk_dir}/usuarios/auth/user`, { params: data });
        setDataUser(response.data);
        if (response.status === 200 && response.data.token) {
          localStorage.setItem('dataUser', JSON.stringify(response.data));
          navigate("/main", { replace: true })
        }
      }
    } catch (err) {
      console.log('ERROR al enviar data : ', err);
      alert('Usuario Invalido')
    }
  };

  return (
    <div>

      <div style={{ position: 'absolute', top : '50%', right : '50%', transform: 'translate(-50%, -50%)',  height: '70vh'}}>
        <div className="container-tight py-6" style={{ backgroundColor: 'black', borderRadius : 10}}>
          <form style={{ borderWidth: 0, backgroundColor: 'black' }}>
            <div className="text-center mb-4">
              <a href="."><img src="./static/logo.svg" height="36" alt="" /></a>
            </div>
            <div className="card card-md" autoComplete="off" style={{ backgroundColor: 'black', borderWidth: 0 }}>
              <div className="card-body">
                <h1 className="card-title text-center mb-4" style={{ color: 'white', fontSize: 50, fontWeight: 'bold' }}>[ KELLER ]</h1>
                <div className="mb-2">
                  <input type="text" className="form-control"
                    style={{
                      height: 52,
                      marginTop: 70,
                      color: 'white',
                      borderWidth: 0,
                      backgroundColor: 'black',
                      borderBottomWidth: 2,
                      borderBottomColor: 'grey'
                    }}
                    placeholder="INGRESE USUARIO" onChange={(e) => { setUser(e.target.value) }} />
                </div>
                <div autoComplete="off">

                  <div className="mb-2" style={{ marginTop: 70 }}>
                    <div className="input-group input-group-flat">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="CONTRASEÑA"
                        autoComplete="off"
                        value={_Password}
                        onChange={(e) => setPass(e.target.value)}
                        style={{
                          color: 'white',
                          borderWidth: 0,
                          backgroundColor: 'black',
                          borderBottomWidth: 2,
                          borderBottomColor: 'grey'
                        }}
                      />

                      <span className="input-group-text"
                        style={{
                          borderWidth: 0,
                          borderBottomWidth: 2,
                          borderBottomColor: 'grey'
                        }}>
                        <button
                          type="button"
                          className="btn btn-link link-secondary"
                          title={showPassword ? "Hide password" : "Show password"}
                          onClick={togglePasswordVisibility}

                        >
                          <svg xmlns="http://www.w3.org/2000/svg"
                            className="icon" width="24" height="10" color='white'
                            viewBox="0 0 24 24" strokeWidth="2"
                            stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="2" />
                            <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                          </svg>

                        </button>
                      </span>
                    </div>
                  </div>

                </div>
                <div className="form-footer">
                  <button type="submit" className="btn btn-primary w-100" onClick={ValidateUser}
                    style={{
                      borderRadius: 7,
                      borderWidth: 1,
                      marginTop: 70,
                      backgroundColor: 'black',
                      color: 'white',
                      borderColor: 'white'
                    }}
                  >INGRESAR</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div style={{
        position: 'fixed',   // Fija el contenedor a la pantalla
        top: 0,
        left: 0,
        width: '100vw',      // Ancho del viewport
        height: '100vh',     // Altura del viewport
        overflow: 'hidden',  // Oculta cualquier contenido que se desborde
        zIndex: -1
      }}>

        <img src={foto} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'blur(0.5px) brightness(0.4)'
        }} />
        {/* <div style={{ position: 'absolute', right: '40%', top: '70%', width: '30%' }}>
          <div style={{ color: 'white', fontSize: 40, fontFamily: 'serif', fontWeight: 'bold' }}>BIENVENIDO</div>
          <div style={{ color: 'white', fontSize: 20, fontFamily: 'serif', fontWeight: 'bold' }}>Favor ingresar su usario y contraseña, para iniciar sesion.</div>
          <p style={{ color: 'grey', borderTopWidth: 1, borderTopColor: 'white' }}>KELLER, es un sistema orientado a la firma digital de facturas para los clientes de INTERMODA S.A.</p>
        </div> */}
      </div>
    </div>


  );
};


export default LoginForm;
