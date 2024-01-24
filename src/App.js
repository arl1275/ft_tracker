import './App.css';
import React from 'react';
import AdminDespachoView from './pages/admin/admin_view_despacho';
//import ModalComponent from './components/list.component';
import MyTabs from './pages/admin/admin_view_index';
import LoginForm from './pages/log_index';
//import AdminDespachoView from './pages/admin/admin_view_despacho';

function App() {
  return (
    <div className="App">
      <MyTabs/>
    </div>
  );
}

export default App;
