import React, { useState, useEffect } from 'react';
import MyTabs from './admin/admin_view_index';
import { bk_dir } from '../conf/configuration.file';
import axios from 'axios';

function LoginForm() {
  const [page, setPage] = useState(null);
  const [user, setUser] = useState('');
  const [_Password, setPass] = useState('');

  const ValidateUSer = async () => {
    try {
      const data = {
        user: user,
        _Password: _Password,
      }

      if (data.user === '' || data._Password == '') {
        alert('FAVOR INGRESE UN USUARIO Y CONTRASEÑA')
      } else {
        const response = await axios.get(bk_dir + '/user/auth/user', { params: data });
        if (response.status === 200) {
          setPage('INDEX');
        } else if (response.status === 401) {
          alert('DATOS INVALIDOS')
        }
      }
    } catch (err) {
      console.log('ERROR al enviar data : ', err);
    }
  }

  if (page === null) {
    return (
      <div className="container-tight py-6">
        <div className="text-center mb-4">
          <a href="."><img src="./static/logo.svg" height="36" alt="" /></a>
        </div>
        <div className="card card-md" action="." method="get" autoComplete="off" >
          <div className="card-body">
            <h2 className="card-title text-center mb-4">LOGIN AL SISTEMA</h2>
            <div className="mb-3">
              <label className="form-label">USUARIO</label>
              <input type="text" className="form-control" placeholder="INGRESE USUARIO" onChange={(e) => { setUser(e.target.value) }} />
            </div>
            <div className="mb-2">
              <div className="input-group input-group-flat">
                <input type="password" className="form-control" placeholder="CONTRASEÑA" autoComplete="off" onChange={(e) => { setPass(e.target.value) }} />
                <span className="input-group-text">
                  <a href="#" className="link-secondary" title="Show password" data-toggle="tooltip">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="2" />
                      <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                    </svg>
                  </a>
                </span>
              </div>
            </div>
            <div className="form-footer">
              <button className="btn btn-primary w-100" onClick={() => { ValidateUSer() }}>INGRESAR</button>
            </div>
          </div>
        </div>
      </div>
      //     </div>
      //   </body>
      // </html>
    )
  } else if (page === 'INDEX') {
    return <MyTabs />;
  }
}

export default LoginForm;