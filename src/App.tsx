import React from 'react';
import { Admin, CustomRoutes, Resource } from 'react-admin';
import MissionCreate from './components/MissionCreate';
import Missions from './components/Missions';
import Sessions from './components/Sessions';
import SessionCreate from './components/SessionCreate';
import Members from './components/Member';
import { Route } from 'react-router-dom';
import { dataProvider } from './dataProvider';

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="missions" list={Missions} create={MissionCreate} />
      <Resource name="sessions" list={Sessions} create={SessionCreate} />
      <CustomRoutes>
        <Route path="/members" element={<Members />} />
      </CustomRoutes>
    </Admin>
  );
}

export default App;
