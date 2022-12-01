import { Modal, TextField } from '@mui/material';
import { FormEvent } from 'react';
import { useEditKeyword } from '../../../../hooks/roadmap';
import useInput from '../../../../hooks/useInput';
import {
  validateDescription,
  validateName,
  validateImportance,
} from '../../../../utils/validator';
import CenterBox from '../../../common/CenterBox';
import { EditKeywordModalProps } from './type';

export const EditKeywordModal = ({
  open,
  onClose,
  keywordContents,
  sessionId,
  keywordId,
}: EditKeywordModalProps) => {
  const name = useInput(
    keywordContents ? keywordContents.name : '',
    validateName
  );
  const importance = useInput(
    keywordContents ? String(keywordContents.importance) : '',
    validateImportance
  );
  const description = useInput(
    keywordContents ? keywordContents.description : '',
    validateDescription
  );
  const isAllValidated =
    name.isValidated && description.isValidated && importance.isValidated;

  const { mutateAsync: editKeyword } = useEditKeyword();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.value && importance.value && description.value) {
      await editKeyword({
        sessionId,
        keywordId,
        name: name.value,
        importance: Number(importance.value),
        description: description.value,
        order: keywordContents.order,
        parentKeywordId: keywordContents.parentKeywordId,
      });
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <CenterBox>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              required
              label="이름"
              onChange={name.onChange}
              value={name.value}
              error={!name.isValidated}
              helperText={name.message}
              fullWidth
            />
          </div>
          <div>
            <TextField
              required
              label="설명"
              onChange={description.onChange}
              value={description.value}
              error={!description.isValidated}
              helperText={description.message}
              fullWidth
              multiline
              maxRows={4}
            />
          </div>
          <div>
            <TextField
              required
              label="중요도"
              onChange={importance.onChange}
              value={importance.value}
              error={!importance.isValidated}
              helperText={importance.message}
              fullWidth
            />
          </div>
          <div>
            <TextField
              required
              disabled
              label="순서"
              defaultValue={keywordContents.order}
              fullWidth
            />
          </div>
          <div>
            <TextField
              required
              disabled
              label="상위 키워드 Id"
              defaultValue={keywordContents.parentKeywordId}
              fullWidth
            />
          </div>
          <button disabled={!isAllValidated}>수정 완료</button>
        </form>
      </CenterBox>
    </Modal>
  );
};