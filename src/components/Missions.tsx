import { Datagrid, List, NumberField, TextField } from 'react-admin';

const Missions = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <NumberField source="session.id" />
      <TextField source="session.name" />
    </Datagrid>
  </List>
);

export default Missions;
