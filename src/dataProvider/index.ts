import jsonServerProvider from 'ra-data-json-server';

import { memberProvider } from './member';

const baseDataProvider = jsonServerProvider(`${process.env.REACT_APP_API_URL}`);

const dataProvider = {
  ...baseDataProvider,
  ...memberProvider,
};

export { dataProvider };
