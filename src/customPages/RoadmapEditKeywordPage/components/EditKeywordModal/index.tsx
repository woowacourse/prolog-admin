import { Modal, Box, TextField } from '@mui/material';
import { useEditKeyword } from '../../../../hooks/roadmap';
import useInput from '../../../../hooks/useInput';
import {
  validateDescription,
  validateName,
  validateImportance,
} from '../../../../utils/validator';
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

  const { mutate: editKeyword } = useEditKeyword({ successCallback: onClose });

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form
          onSubmit={(event) => {
            event.preventDefault();

            if (name.value && importance.value && description.value) {
              editKeyword({
                sessionId,
                keywordId,
                name: name.value,
                importance: Number(importance.value),
                description: description.value,
                order: keywordContents.order,
                parentKeywordId: keywordContents.parentKeywordId,
              });
            }
          }}
        >
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
      </Box>
    </Modal>
  );
};

export const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #646464',
  boxShadow: 24,
  p: 4,
};
