import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
} from 'react-admin';

const MissionCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source="sessionId" reference="sessions">
        <SelectInput />
      </ReferenceInput>
      <TextInput
        source="name"
        placeholder="등록할 미션의 이름을 입력해주세요"
        resettable
        required
      />
    </SimpleForm>
  </Create>
);

export default MissionCreate;
