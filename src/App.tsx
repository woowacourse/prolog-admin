import { Admin, CustomRoutes, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import MissionCreate from './components/MissionCreate';
import Missions from './components/Missions';
import Sessions from './components/Sessions';
import SessionCreate from './components/SessionCreate';
import Members from './components/Member';
import { Route } from 'react-router-dom';

import PopularStudylogsUpdate from './components/PopularStudylogsUpdate';
import MyLayout from './components/Layout';
import { BASE_URL } from './client';

const dataProvider = jsonServerProvider(BASE_URL);

function App() {
  return (
    <Admin layout={MyLayout} dataProvider={dataProvider}>
      <Resource name="missions" list={Missions} create={MissionCreate} />
      <Resource name="sessions" list={Sessions} create={SessionCreate} />
      <CustomRoutes>
        <Route path="/members" element={<Members />} />
        <Route path="/studylogs" element={<PopularStudylogsUpdate />} />
      </CustomRoutes>
    </Admin>
  );
}

export default App;
