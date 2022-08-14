import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import MissionCreate from './components/MissionCreate';
import Missions from './components/Missions';

const dataProvider = jsonServerProvider(`${process.env.REACT_APP_API_URL}`);

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="missions" list={Missions} create={MissionCreate} />
    </Admin>
  );
}

export default App;
