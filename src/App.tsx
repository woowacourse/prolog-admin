import { Admin, Resource, CustomRoutes } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import MissionCreate from './components/react-admin/MissionCreate';
import SessionCreate from './components/react-admin/SessionCreate';
import { Route } from 'react-router-dom';
import MyLayout from './components/custom/Layout';
import { BASE_URL } from './client';
import Missions from './components/react-admin/Missions';
import Sessions from './components/react-admin/Sessions';
import PopularStudylogsUpdate from './components/custom/PopularStudylogsUpdate';
import Roadmap from './components/custom/Roadmap';

const dataProvider = jsonServerProvider(BASE_URL);

function App() {
  return (
    <Admin layout={MyLayout} dataProvider={dataProvider}>
      <Resource name="missions" list={Missions} create={MissionCreate} />
      <Resource name="sessions" list={Sessions} create={SessionCreate} />
      <CustomRoutes>
        <Route path="/studylogs" element={<PopularStudylogsUpdate />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </CustomRoutes>
    </Admin>
  );
}

export default App;
