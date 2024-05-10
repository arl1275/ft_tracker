import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/log_index';
import MyTabs from './pages/admin/admin_view_index';
import PrivateRoute from './components/any_components/privateRoute';// Asegúrate de importar correctamente

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path='/main' element={<PrivateRoute><MyTabs /></PrivateRoute>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
