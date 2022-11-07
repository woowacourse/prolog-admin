import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

const SessionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source="name"
        placeholder="등록할 세션의 이름을 입력해주세요"
        resettable
        required
      />
    </SimpleForm>
  </Create>
);

export default SessionCreate;
