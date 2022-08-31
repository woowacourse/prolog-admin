import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import MissionCreate from './components/MissionCreate';
import Missions from './components/Missions';
import Sessions from './components/Sessions';
import SessionCreate from './components/SessionCreate';

const dataProvider = jsonServerProvider(`${process.env.REACT_APP_API_URL}`);

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="missions" list={Missions} create={MissionCreate} />
      <Resource name="sessions" list={Sessions} create={SessionCreate} />
    </Admin>
  );
}

export default App;
