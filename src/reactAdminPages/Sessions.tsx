import { Datagrid, List, NumberField, TextField } from 'react-admin';

const Sessions = () => (
  <List>
    <Datagrid>
      <NumberField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
);

export default Sessions;
