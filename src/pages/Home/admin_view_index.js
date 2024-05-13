import DispachView from './dispach_view';
import DashboardFacturas from '../../components/resume/resFact.component';
import { ConfigPage } from '../AjustPage/config.page';
import ResumenHistorico from '../../components/Historico/hisotico.view';
import NavbarMenu from '../../components/minicomponents/navbar';
import { Routes, Route } from 'react-router-dom';

function MyTabs() {

  return (
    <div>
      <NavbarMenu />
      <Routes>
        <Route path='/administration/*' element={<ConfigPage />} />
        <Route path='/historic' element={<ResumenHistorico />} />
        <Route path='/dashboard' element={<DashboardFacturas />} />
        <Route path='/dispach' element={<DispachView />} />
      </Routes>

    </div>
  );
}

export default MyTabs;
