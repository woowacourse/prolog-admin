import { Modal, Box, TextField } from '@mui/material';
import { useAddKeyword } from '../../../../hooks/roadmap';
import useInput from '../../../../hooks/useInput';
import {
  validateDescription,
  validateName,
  validateImportance,
  validateOrder,
} from '../../../../utils/validator';
import { AddKeywordModalProps } from './type';

export const AddKeywordModal = ({
  open,
  onClose,
  sessionId,
  parentKeywordId,
}: AddKeywordModalProps) => {
  const name = useInput('', validateName);
  const importance = useInput('', validateImportance);
  const description = useInput('', validateDescription);
  const order = useInput('', validateOrder);

  const isAllValidated =
    name.isValidated && description.isValidated && importance.isValidated;

  const { mutate: addKeyword } = useAddKeyword({ successCallback: onClose });

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
              addKeyword({
                sessionId,
                name: name.value,
                importance: Number(importance.value),
                description: description.value,
                order: Number(order.value),
                parentKeywordId,
              });
            }
          }}
        >
          <div>
            <TextField
              required
              label="이름"
              fullWidth
              onChange={name.onChange}
              value={name.value}
              error={!name.isValidated}
              helperText={name.message}
            />
          </div>
          <div>
            <TextField
              required
              label="설명"
              fullWidth
              multiline
              maxRows={4}
              onChange={description.onChange}
              value={description.value}
              error={!description.isValidated}
              helperText={description.message}
            />
          </div>
          <div>
            <TextField
              required
              label="중요도"
              fullWidth
              onChange={importance.onChange}
              value={importance.value}
              error={!importance.isValidated}
              helperText={importance.message}
            />
          </div>
          <div>
            <TextField
              required
              label="순서"
              fullWidth
              onChange={order.onChange}
              value={order.value}
              error={!order.isValidated}
              helperText={order.message}
            />
          </div>
          <div>
            <TextField
              required
              disabled
              label="상위 키워드 Id"
              fullWidth
              value={parentKeywordId}
            />
          </div>
          <button disabled={!isAllValidated}>키워드 추가</button>
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
