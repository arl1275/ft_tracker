import React, {useState, useEffect} from 'react';
import MyTabs from './admin/admin_view_index';

function LoginForm() {
  const [page, setPage] = useState('LOGIN');

  if(page === 'LOGIN'){return (
      <html lang="en">
        <body className="antialiased border-top-wide border-primary d-flex flex-column">
          <div className="flex-fill d-flex flex-column justify-content-center py-4">
            <div className="container-tight py-6">
              <div className="text-center mb-4">
                <a href="."><img src="./static/logo.svg" height="36" alt="" /></a>
              </div>
              <form className="card card-md" action="." method="get" autoComplete="off" >
                <div className="card-body">
                  <h2 className="card-title text-center mb-4">LOGIN AL SISTEMA</h2>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" placeholder="INGRESE USUARIO" />
                  </div>
                  <div className="mb-2">
                    <div className="input-group input-group-flat">
                      <input type="password" className="form-control" placeholder="CONTRASEÑA" autoComplete="off" />
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
                    <button type="submit" className="btn btn-primary w-100" onClick={()=>{setPage("INDEX")}}>INGRESAR</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
         
        </body>

      </html>
  )}else if (page === 'INDEX') {
    return <MyTabs />;
  }
}

export default LoginForm;